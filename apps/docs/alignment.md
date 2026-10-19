# Workspace Architecture Map

This section tracks the active workspace directories and compilation inter-dependencies mapped within the SaaS infrastructure framework.

## Directory Structural Layout

```text
my-saas-monorepo/
├── apps/
│   ├── api/                   # Express Backend Engine Microservice
│   ├── docs/                  # VitePress Documentation (This Framework Workspace)
│   └── web/                   # Vite + TypeScript Customer UI Panel
├── packages/
│   ├── config/                # Centralized Shared Compiler Options
│   └── ui/                    # Shared Design Library Component Space
└── infra/
    └── nginx/                 # Multi-Tenant Reverse Proxy Gateway Configs
```

::: info COMPILATION GRAPH CONVERSIONS
When executing `pnpm build`, **Turborepo** scans the dependency arrays. It ensures `@saas/config` initializes first, then compiles the structural parameters of `@saas/ui` into JavaScript before allowing the `apps/web` client bundler to optimize assets.
:::
