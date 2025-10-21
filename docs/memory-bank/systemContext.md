# System Context

## Architecture
Next.js 14 app with feature-based modules. Each feature has its own components, hooks, services, utils.

## Key Systems
- **Property System**: Filtering, search, maps with Zustand store
- **Auth System**: Forms, validation, protected routes
- **API Layer**: Axios instances with React Query caching
- **UI System**: Radix UI + Tailwind components

## Data Flow
1. User interaction → Zustand store update
2. Store change → React Query API call
3. API response → Component re-render
4. URL sync with filter state
