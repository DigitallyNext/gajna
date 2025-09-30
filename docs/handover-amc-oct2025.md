# Website Handover and AMC – Oct to Dec 2025

This document details the handover process, inventory counts, acceptance checklist, and the scope of the 3‑month AMC (Annual Maintenance Contract).

## 1) Site Inventory (as of handover)
- Total pages (counting individual dynamic pages): 53
  - Static routes: 11
  - Dynamic templates: 2
    - /blog/[id]
    - /products/[slug]
  - Dynamic page instances: 42 (39 product detail pages, 3 blog posts)
- API routes: 2
  - /api/contact
  - /api/trade-enquiry
- Special pages: not-found (custom 404)
- Public assets: logos, banners, product images, sitemap.xml, robots.txt

## 2) Key Dates and Status
- Go‑Live: Oct 1, 2025
- Handover: Oct 1, 2025 (post‑launch)
- AMC window: Oct 1, 2025 – Dec 31, 2025

## 3) Access and Ownership
- Source repository: URL, branches, permissions, CI/CD access (to be confirmed)
- Hosting: production/staging access (view or change via request)
- Domain/DNS: registrar, nameservers, DNS records (A/AAAA/CNAME)
- SSL/TLS: issuer, expiry date, renewal plan
- Analytics/Tags: GA/GTM access
- Third‑party services: forms, media storage, integrations (as applicable)

## 4) Environment & Deployment
- Environment variables (.env): document keys, purpose, and environment
- Node version & build commands: `npm run build`, `npm run start` (or platform‑specific)
- Deployment & rollback: steps to deploy, rollback procedure, and access
- Backups: frequency, storage location, retention policy

## 5) Quality Gates (baseline at handover)
- Accessibility: alt text coverage, color contrast spot‑check
- Performance: Lighthouse baseline (Home, Products index, Blog index)
- SEO: sitemap.xml, robots.txt, titles/meta, canonical (if used)
- Responsiveness: mobile/desktop checks for header, nav, footer, hero, tables, forms

## 6) Functional Checks
- Navigation: primary/secondary menus, language switcher
- Forms: Contact and Trade Enquiry (API routes respond OK)
- Internal links: validate primary nav/footer links, no broken links
- Back‑to‑Top: visible on scroll, smooth scroll to top, no overlaps on mobile/desktop

## 7) AMC Scope (Oct–Dec 2025)
Included (no new page creation):
- Basic content edits (text, links) across existing pages
- Banner updates (home/section banners) using assets provided by client
- Minor UI adjustments and non‑breaking bug fixes
- Hygiene improvements (alt text corrections, small meta updates)
- Minor dependency patching that does not break the site
- Uptime observation after deploys
- Website Audit Weekly.

Excluded (quoted separately):
- New page creation or new route segments
- Major feature development/redesigns
- New integrations or complex workflows
- Large content migrations

Response & Scheduling:
- Acknowledgement: within 1 business day
- Minor updates: 1–3 business days from receipt of final content/assets
- Banner swaps: typically 1–2 business days
- Deploy windows scheduled to minimize downtime

Change Request Flow:
1. Client emails request with subject: “AMC Request – [Page/Section] – [Date]”
2. Include page URL(s), exact placement, final text, assets, and alt text (if images)
3. We confirm scope under AMC, provide ETA, note risks (if any)
4. Execute changes and share a short changelog


