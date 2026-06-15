# Deployment — Cybersecurity Curriculum (One Stop Service)

Target domain: **`cy.computing.kku.ac.th`**

This document describes how to build and deploy the site. It intentionally
contains **no server credentials**. IP addresses, usernames, passwords, SSH
keys, tokens, and secrets must never be committed to this repository, written
into source/data files, or shown on the website.

---

## 0. Project overview

- **What:** A static, bilingual (TH/EN) website for the B.Sc. Cybersecurity
  program, College of Computing, Khon Kaen University.
- **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS. Almost all
  content is editable JSON under `data/`.
- **Output:** A fully static site (`out/`) — no server-side runtime and no
  database, so it can be served by any static web server.
- **Readiness:** Development readiness 100%; official publication readiness is
  **pending program verification** (see `OFFICIAL_HANDOFF.md` and `/about`).

---

## 1. Build modes

The app is a Next.js 14 (App Router) project and supports two build targets:

| Target | Command | Output | Use when |
| --- | --- | --- | --- |
| Static export (recommended for `cy.computing.kku.ac.th`) | `DEPLOY_TARGET=github-pages NEXT_PUBLIC_BASE_PATH="" npm run build` | `out/` (static HTML/CSS/JS) | Served by nginx/Apache at the domain root |
| Node server | `npm run build` then `npm run start` | `.next/` (server) | Served by Node behind a reverse proxy |

For a site served at the **root** of `cy.computing.kku.ac.th`, set
`NEXT_PUBLIC_BASE_PATH=""` so asset paths resolve from `/`. If the site is ever
served from a sub-path (e.g. `/cy/`), set `NEXT_PUBLIC_BASE_PATH="/cy"`.

### Static output directory

After a static build, deploy the contents of **`out/`** to the web root that
serves `cy.computing.kku.ac.th`.

---

## 2. Local commands

```bash
npm install
npm run typecheck     # tsc --noEmit
npm run lint          # next lint
npm run build         # production build (default = Node target)

# Static export for the college server (root domain):
DEPLOY_TARGET=github-pages NEXT_PUBLIC_BASE_PATH="" npm run build
# → produces ./out
```

---

## 3. Environment assumptions

- Node.js 18+ and npm available on the build machine.
- The build is performed **off-server** (CI or a developer machine); only the
  static `out/` artifact is copied to the server. The server only needs a web
  server (e.g. nginx) to serve static files — no Node runtime required for the
  static target.
- HTTPS is terminated at the server / reverse proxy.
- Remote faculty images are loaded from `api.computing.kku.ac.th` at runtime in
  the browser; the server hosting this site does not need to proxy them. If an
  image fails to load, the UI shows an initials avatar automatically.

---

## 4. Server credential policy (IMPORTANT)

- **Never** commit or hard-code: server IP, SSH username, password, tokens,
  keys, or secrets.
- Server access details are shared **out of band** and stored only in the
  operator's secret manager / password vault.
- When documenting commands, use placeholders only:

  ```text
  [SERVER_IP]
  [SERVER_USER]
  [SERVER_PASSWORD_PROVIDED_SEPARATELY]
  cy.computing.kku.ac.th
  ```

- Example (illustrative — fill placeholders from the vault, do not commit real values):

  ```bash
  rsync -avz --delete ./out/ [SERVER_USER]@[SERVER_IP]:/var/www/cy/
  ```

- If a credential is ever committed by accident, treat it as compromised:
  rotate it immediately and scrub history.

---

## 5. Pre-launch checklist

- [ ] `npm run typecheck` passes
- [ ] `npm run build` (and the static export) succeeds with no errors
- [ ] All routes render in both **TH** and **EN** with no untranslated leakage
      (proper nouns, course names, and person names may remain as-is)
- [ ] Dark mode and mobile layout verified on key pages
- [ ] No credentials anywhere in the repo (`git grep` for IP/password patterns)
- [ ] External official links open correctly (College of Computing pages)
- [ ] `robots`/analytics/domain settings reviewed for the production domain

## 6. Official data verification checklist (with the program)

- [x] **Faculty** (`data/faculty.json`) — names, positions, expertise, emails,
      and profile links confirmed; flip `status` to `verified` once approved
- [x] **Contact** (`data/contact.json`) — program-specific office / coordinator
      filled in (currently "To be confirmed")
- [ ] **Announcements** (`data/announcements.json`) — replace the SAMPLE entries
      with real announcements (or hide the page until ready)
- [ ] **Admissions** — confirm Cybersecurity-specific rounds/qualifications, or
      keep as a gateway to the college's official admissions page
- [ ] **Official links** (`data/official-links.json`) — URLs still valid

## 7. Rollback plan (basic)

- Keep the previous `out/` artifact (or a tagged release) before each deploy.
- To roll back: re-deploy the previous artifact to the web root, or
  `git checkout <previous-tag>` and rebuild.
- Because the static target has no database or server state, rollback is simply
  swapping the served files back to the prior version.

---

## 8. Nginx static hosting example (illustrative)

The static build uses `trailingSlash: true`, so each route is emitted as a
directory containing `index.html`. A minimal nginx server block:

```nginx
server {
    listen 80;
    server_name cy.computing.kku.ac.th;
    # Redirect to HTTPS once the certificate is installed.
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name cy.computing.kku.ac.th;

    # ssl_certificate / ssl_certificate_key managed by the server operator.

    root /var/www/cy;        # contents of the built ./out directory
    index index.html;

    location / {
        try_files $uri $uri/ $uri/index.html /404.html;
    }
}
```

Deploy by copying `out/` to the web root (see §4 for the credential policy):

```bash
rsync -avz --delete ./out/ [SERVER_USER]@[SERVER_IP]:/var/www/cy/
```

---

## 9. Post-launch validation

After deploying to `cy.computing.kku.ac.th`:

- [ ] Home page and all primary routes load over **HTTPS** with a valid
      certificate (no mixed-content warnings)
- [ ] Language toggle (TH/EN) and dark/light theme persist across navigation
- [ ] Faculty images load, or fall back to initials avatars
- [ ] External official links (College of Computing) open in a new tab
- [ ] `/404` (an unknown path) shows the custom not-found page
- [ ] `favicon`/logo renders; page titles are correct in the browser tab
- [ ] Mobile layout verified on a real device or emulator

---

## 10. Ownership & contacts

Fill these in with the program before public launch (placeholders only — no
personal data is committed here):

| Role | Placeholder |
| --- | --- |
| Program data owner | `[PROGRAM_DATA_OWNER]` |
| Technical maintainer | `[TECHNICAL_MAINTAINER]` |
| Server operator | `[SERVER_OPERATOR]` |

See `MAINTENANCE.md` for how to edit content and `OFFICIAL_HANDOFF.md` for the
program-facing review guide.
