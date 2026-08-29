# Images — entra-connect-mandatory-upgrade-2026

Slug: `entra-connect-mandatory-upgrade-2026`
Article: `content/posts/entra-connect-mandatory-upgrade-2026.md`

## Files in this folder

1. **entra-connect-sync-overview-cover.png** (used as `cover` + Εικόνα 1)
   - Source: uploaded by user (own tenant screenshot)
   - Shows: Microsoft Entra admin center → Entra ID → Entra Connect → Connect Sync overview page
     (Sync status, Password Hash Sync status, Version field with download link, User Sign-in section)
   - PII check: ✅ clean — no tenant name, no domain names, no user identifiers visible.
     Only generic UI chrome ("Microsoft Entra admin center", "Home > Microsoft Entra Connect").
   - Used twice: once as the front-matter `cover` image, once inline as Εικόνα 1 (same file,
     referenced with the site-relative `/images/...` path in the body per the established
     blockquote-caption pattern).

2. **download-center-decommission-notice.png** (Εικόνα 2)
   - Source: uploaded by user (public Microsoft Download Center page, not tenant-specific)
   - Shows: microsoft.com/en-us/download/details.aspx?id=47594 — version 2.6.84.0, "Downloaded"
     button state, and the note that new Entra Connect Sync versions are only released via the
     Microsoft Entra admin center rather than the Download Center.
   - PII check: ✅ not applicable — public Microsoft marketing page, no user/tenant data.

## Still to capture (optional, if you want to strengthen the article further)

- A screenshot of the actual **Manage** tab inside **Entra Connect → Get started** in the Entra
  admin center, showing the in-portal download button, to make step 4 of the "Πώς το ελέγχεις"
  section even more concrete. Not included here because it wasn't provided/captured yet.
- Optional: a screenshot of the **Synchronization Service Manager → About** dialog on an actual
  Connect server, for readers without portal access who want to check the version locally.

## Notes

- No redaction was necessary for either image — both were already clean of tenant-identifying
  information.
- Cover image reused as Εικόνα 1 rather than duplicated as a separate file, since it's the same
  screenshot referenced in two places in the front matter / body.
