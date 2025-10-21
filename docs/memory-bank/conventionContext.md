# Convention Context

## File Naming
- **lowercase**: icons, pages, providers, global functions
- **PascalCase**: components only

## Project Structure
```
src/
├── app/                    # Next.js App Router
├── components/            # Global components
├── hooks/                 # Global hooks
├── lib/                   # Global utilities
├── provider/              # Global providers
├── utils/                 # Global utils
├── globalConfig.ts        # Global config (axios, etc)
└── feature/               # Feature-based modules
    └── auth/              # Auth feature
        ├── components/    # Auth-specific components
        ├── views/         # Auth-specific views
        ├── utils/         # Auth-specific utils
        ├── services/      # Auth-specific services
        └── hooks/         # Auth-specific hooks
```

## API Convention
- **baseApi.ts**: Global axios instance outside
- **[feature]Api.ts**: Feature-specific API in services
- **use[Feature].ts**: React Query hooks for that API

## Examples
- `icon.tsx` (lowercase)
- `page.tsx` (lowercase)
- `provider.tsx` (lowercase)
- `PropertyCard.tsx` (PascalCase component)
- `propertyApi.ts` (feature API)
- `useProperty.ts` (React Query hook)
