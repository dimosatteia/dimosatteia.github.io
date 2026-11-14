# ============================================================
# Exchange Online - Mailbox Forwarding & Inbox Rules Audit
# Read-only audit
# ============================================================

Connect-ExchangeOnline

$OutputFile  = ".\inboxrules.json"

# Retry ρυθμίσεις για Get-InboxRule (throttling / timeouts)
$MaxAttempts = 3     # Συνολικές προσπάθειες ανά mailbox
$BaseDelay   = 5     # Δευτερόλεπτα· αυξάνεται ανά προσπάθεια (5, 10, ...)

$out = foreach (
    $m in Get-EXOMailbox `
        -ResultSize Unlimited `
        -Properties ForwardingSmtpAddress,ForwardingAddress,DeliverToMailboxAndForward
) {

    # --------------------------------------------------------
    # 1. Mailbox-level forwarding
    # --------------------------------------------------------

    [pscustomobject]@{
        Type                       = 'Mailbox'
        Mailbox                    = $m.UserPrincipalName
        ForwardingSmtpAddress      = "$($m.ForwardingSmtpAddress)"
        ForwardingAddress          = "$($m.ForwardingAddress)"
        DeliverToMailboxAndForward = $m.DeliverToMailboxAndForward
    }


    # --------------------------------------------------------
    # 2. Inbox Rules (με retry)
    #    Περιλαμβάνονται και hidden rules
    # --------------------------------------------------------
    # Σε παροδική αποτυχία (throttling, timeout) γίνεται νέα
    # προσπάθεια μετά από αυξανόμενη αναμονή, έως $MaxAttempts.
    # --------------------------------------------------------

    $ruleErr  = $null
    $rules    = $null
    $attempts = 0

    for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {

        $attempts = $attempt

        # Reset σε κάθε προσπάθεια ώστε error προηγούμενης
        # προσπάθειας ή προηγούμενου mailbox να μην επηρεάσει.
        $ruleErr = $null
        $rules   = $null

        $rules = Get-InboxRule `
            -Mailbox $m.UserPrincipalName `
            -IncludeHidden `
            -WarningAction SilentlyContinue `
            -ErrorAction SilentlyContinue `
            -ErrorVariable ruleErr

        if (-not $ruleErr) { break }

        if ($attempt -lt $MaxAttempts) {
            Write-Host "Retry $attempt/$($MaxAttempts - 1) για $($m.UserPrincipalName)..." `
                -ForegroundColor DarkYellow
            Start-Sleep -Seconds ($BaseDelay * $attempt)
        }
    }


    # --------------------------------------------------------
    # 3. Καταγραφή failure
    # --------------------------------------------------------
    # Αν μετά από όλες τις προσπάθειες δεν διαβάστηκαν τα
    # Inbox Rules, καταγράφεται ως Error ώστε το mailbox να
    # μη θεωρηθεί λανθασμένα "καθαρό".
    # Αν το Exception.Message είναι κενό, κρατείται ολόκληρο
    # το ErrorRecord ως κείμενο.
    # --------------------------------------------------------

    if ($ruleErr) {

        $msg = "$($ruleErr[0].Exception.Message)"
        if ([string]::IsNullOrWhiteSpace($msg)) {
            $msg = "$($ruleErr[0])"
        }
        if ([string]::IsNullOrWhiteSpace($msg)) {
            $msg = "Unknown error ($($ruleErr[0].FullyQualifiedErrorId))"
        }

        [pscustomobject]@{
            Type     = 'Error'
            Mailbox  = $m.UserPrincipalName
            Attempts = $attempts
            Message  = $msg
        }
    }


    # --------------------------------------------------------
    # 4. Καταγραφή όλων των Inbox Rules
    # --------------------------------------------------------

    $rules | ForEach-Object {

        [pscustomobject]@{
            Type                       = 'Rule'
            Mailbox                    = $m.UserPrincipalName

            # Rule information
            # Τα κενά (null) φιλτράρονται με Where-Object { $_ }, αλλιώς
            # το @() γίνεται @("") και κάθε κανόνας μετριέται ως προώθηση.
            Name                       = $_.Name
            Enabled                    = $_.Enabled
            Priority                   = $_.Priority
            Description                = "$($_.Description)"

            # Conditions
            From                       = @(
                $_.From | Where-Object { $_ } |
                    ForEach-Object { "$_" }
            )

            FromAddressContainsWords   = @(
                $_.FromAddressContainsWords | Where-Object { $_ }
            )

            SubjectContainsWords       = @(
                $_.SubjectContainsWords | Where-Object { $_ }
            )

            BodyContainsWords          = @(
                $_.BodyContainsWords | Where-Object { $_ }
            )

            SubjectOrBodyContainsWords = @(
                $_.SubjectOrBodyContainsWords | Where-Object { $_ }
            )

            # Actions
            MoveToFolder               = "$($_.MoveToFolder)"
            CopyToFolder               = "$($_.CopyToFolder)"

            DeleteMessage              = $_.DeleteMessage
            SoftDeleteMessage          = $_.SoftDeleteMessage
            MarkAsRead                 = $_.MarkAsRead
            StopProcessingRules        = $_.StopProcessingRules

            ForwardTo                  = @(
                $_.ForwardTo |
                    Where-Object { $_ } |
                    ForEach-Object { "$_" }
            )

            ForwardAsAttachmentTo      = @(
                $_.ForwardAsAttachmentTo |
                    Where-Object { $_ } |
                    ForEach-Object { "$_" }
            )

            RedirectTo                 = @(
                $_.RedirectTo |
                    Where-Object { $_ } |
                    ForEach-Object { "$_" }
            )
        }
    }
}


# ============================================================
# 5. Export αποτελεσμάτων σε JSON
# ============================================================

$out |
    ConvertTo-Json -Depth 5 |
    Out-File $OutputFile -Encoding utf8


# ============================================================
# 6. Statistics
# ============================================================

$path = (Resolve-Path $OutputFile).Path

$mailboxes = @(
    $out | Where-Object Type -eq 'Mailbox'
).Count

$rules = @(
    $out | Where-Object Type -eq 'Rule'
).Count

$failedItems = @(
    $out | Where-Object Type -eq 'Error'
)
$failed = $failedItems.Count

$forwardingMailboxes = @(
    $out |
        Where-Object {
            $_.Type -eq 'Mailbox' -and
            (
                $_.ForwardingSmtpAddress -or
                $_.ForwardingAddress
            )
        }
).Count

$forwardingRules = @(
    $out |
        Where-Object {
            $_.Type -eq 'Rule' -and
            (
                @($_.ForwardTo).Count -gt 0 -or
                @($_.ForwardAsAttachmentTo).Count -gt 0 -or
                @($_.RedirectTo).Count -gt 0
            )
        }
).Count


# ============================================================
# 7. Disconnect από Exchange Online
# ============================================================

Disconnect-ExchangeOnline -Confirm:$false


# ============================================================
# 8. Summary
# ============================================================

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Exchange Online Audit Completed" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "Mailboxes checked:          $mailboxes"
Write-Host "Inbox Rules found:          $rules"
Write-Host "Mailbox forwarding found:   $forwardingMailboxes"
Write-Host "Forwarding rules found:     $forwardingRules"

if ($failed -gt 0) {

    Write-Host ""
    Write-Host "WARNING: Δεν διαβάστηκαν τα Inbox Rules για $failed mailbox(es) μετά από $MaxAttempts προσπάθειες." `
        -ForegroundColor Yellow

    # Εμφάνιση των αποτυχημένων mailboxes απευθείας στην οθόνη
    $failedItems | ForEach-Object {
        Write-Host "  - $($_.Mailbox): $($_.Message)" -ForegroundColor Yellow
    }

    Write-Host "Τα συγκεκριμένα mailboxes έχουν καταγραφεί ως Type='Error' στο JSON." `
        -ForegroundColor Yellow
}
else {

    Write-Host ""
    Write-Host "Inbox Rules successfully read for all checked mailboxes." `
        -ForegroundColor Green
}

Write-Host ""
Write-Host "Το αρχείο αποθηκεύτηκε στο:" -ForegroundColor Green
Write-Host $path -ForegroundColor Green
Write-Host ""
