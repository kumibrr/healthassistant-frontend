# HealthAssistant frontend development

## Source and compatibility

- Fork: https://github.com/kumibrr/healthassistant-frontend
- Product branch: `healthassistant`.
- Upstream: https://github.com/home-assistant/frontend
- Starting release: `20260930.4`.
- Starting commit: `26690e06b0bf64a1487929245c32842ef92c62b5`.
- Matching inspected Core: HealthAssistant Core 2026.10.2, facilities branch
  `feature/hospital-facilities-simulation`.

This fork currently preserves the upstream application behavior. Hospital
Overview, an indoor Map with building and floor selection, hospital navigation,
and removal of Media and To-do from that navigation are the confirmed next
milestone. They are not implemented by creating this repository.

Keep the upstream copyright, license, attribution and agent guidance. Use an
`upstream` remote for upstream changes. The fork's `healthassistant` branch is
the product baseline; upstream's moving `dev` branch is not the tested baseline.

## Toolchain and setup

Use Node `24.21.0` from `.nvmrc` and pnpm `11.28.0` from `package.json`.

```bash
pnpm install --frozen-lockfile
pnpm exec gulp gather-gallery-pages
pnpm test --maxWorkers=4
pnpm lint:types
pnpm build --modern
```

If using mise, prefix commands with `mise exec node@24.21.0 --`. For example:

```bash
mise install node@24.21.0
mise exec node@24.21.0 -- pnpm install --frozen-lockfile
```

The gallery page index is generated into the ignored `gallery/build/` directory.
Generate it before the repository-wide typecheck; otherwise TypeScript reports
missing `gallery/build/import-pages` modules on a fresh checkout.

This fork also fixes upstream's font-copy filter for dotted checkout paths such
as `.t3/`. The copy step must traverse directories regardless of their names and
include WOFF2 files. `pnpm test test/build-scripts` covers that regression and the
existing build utilities.

The modern production build writes `hass_frontend/`, including HTML entrypoints,
hashed JavaScript, static files and service workers. It excludes the legacy
JavaScript bundle. Use `pnpm build` for the complete modern and legacy production
build. Build output and dependencies are ignored by Git.

Local builds can use the repository's English-only translation fallback without
GitHub or Lokalise credentials. Multilingual release builds require the normal
translation provisioning; an English-only baseline does not validate that release
workflow. Never commit translation credentials or generated translation caches.

## Connect the checkout to Core

Build this repository first. In the intended Home Assistant configuration
directory, configure its source root, not the generated `hass_frontend/` folder:

```yaml
frontend:
  development_repo: /absolute/path/to/healthassistant-frontend
```

For the checkout used to establish the fork, the value is:

```yaml
frontend:
  development_repo: /home/kumibrr/.t3/projects/healthassistant-frontend
```

Start Core with its existing hospital run script and the intended configuration
directory. The Core fork loads the frontend from
`<development_repo>/hass_frontend/`; its pinned Python dependency can remain
installed. Do not edit files in Core's `.venv/site-packages/hass_frontend/`.

For development, `pnpm dev` builds and watches these same assets. The build and
development watcher share one output lock; run only one at a time. Production
deployment should use a versioned build artifact from the product branch rather
than rely on an absolute development path.

## Hospital implementation seams

Inspect these existing native frontend modules before changing product behavior:

- `src/layouts/partial-panel-resolver.ts`: native panel routing and fallback.
- `src/data/panel.ts`: landing-page preference precedence and panel metadata.
- `src/components/ha-sidebar.ts`: navigation, branding and panel ordering.
- `src/panels/home/ha-panel-home.ts`: the existing Overview entrypoint.
- `src/panels/lovelace/strategies/map/map-view-strategy.ts`: the generated Map.
- `src/state/connection-mixin.ts`: shell subscriptions and initialization cost.

Core changes will also be needed for building/floor membership, persisted floor
plans, hospital data projections, permissions, route registration, onboarding and
non-destructive migration. Preserve existing customized dashboards, old links,
recorded reading attribution and an administrator repair path when hospital data
is unavailable. Do not broaden staff access by changing only a sidebar flag.
