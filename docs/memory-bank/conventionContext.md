# Convention Context

## File Naming

- **lowercase**: icons, pages, providers, global functions
- **PascalCase**: components , hooks, services only

## Examples

- `icon.tsx` (lowercase)
- `page.tsx` (lowercase)
- `provider.tsx` (lowercase)
- `MainEditor.tsx` (PascalCase component)
- `authApi.ts` (PascalCase service)
- `useVocabularyQueries.tsx` (PascalCase hook)

### 📁 Folder & File Structure

- **Feature-based architecture**: Each feature has its own folder under `/src/feature/` with consistent subfolders:
  - `components/` - Feature-specific components
  - `services/` - API services (e.g., `authApi.ts`, `vocabularyApi.ts`)
  - `hooks/` - React Query hooks (e.g., `useVocabularyQueries.tsx`)
  - `views/` - Feature-specific views/pages
  - `utils/` - Feature-specific utilities

**Example structure:**

```
src/feature/vocabulary/
├── components/
│   ├── VocabularyCard.tsx
│   └── VocabularyForm.tsx
├── services/
│   └── vocabularyApi.ts
├── hooks/
│   └── useVocabularyQueries.tsx
└── views/
    └── VocabularyListView.tsx
```

- **Global structure**:
  - `/src/components/` - Global reusable components
  - `/src/hooks/` - Global hooks
  - `/src/lib/` - Global utilities
  - `/src/services/` - Global API configuration (`baseApi.ts`)
  - `/src/store/` - Global state management (Zustand stores)

### 🔌 API & Data Fetching Pattern

- **Centralized API**: Single `baseApi.ts` with axios instance and global error handling
- **Feature APIs**: Each feature has its own API service (e.g., `authApi.ts`, `vocabularyApi.ts`)
- **Consistent error handling**: All API calls use `handleApiError()` utility
- **React Query integration**:
  - Key factory pattern for query keys (e.g., `VOCABULARY_KEY_FACTORY`)
  - Standardized hooks: `useQuery` for reads, `useMutation` for writes
  - Optimistic updates with rollback on error
  - Query invalidation on mutations

**Example API service:**

```typescript
// src/feature/vocabulary/services/vocabularyApi.ts
const vocabularyApi = {
  create(data: CreateVocabularyDto): Promise<VocabularyResponseDto> {
    return api
      .vocabularyControllerCreate(data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  findAll(query: VocabularyQueryParams): Promise<VocabulariesResponse> {
    return api
      .vocabularyControllerFindAll(query)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
};
```

**Example React Query hook:**

```typescript
// src/feature/vocabulary/hooks/useVocabularyQueries.tsx
export const VOCABULARY_KEY_FACTORY = {
  all: ["vocabulary"] as const,
  lists: () => [...VOCABULARY_KEY_FACTORY.all, "list"] as const,
  list: (params: VocabularyQueryParams) =>
    [...VOCABULARY_KEY_FACTORY.lists(), params] as const,
};

export const useVocabularies = (params: VocabularyQueryParams) => {
  return useQuery({
    queryKey: VOCABULARY_KEY_FACTORY.list(params),
    queryFn: () => vocabularyApi.findAll(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
```

### 🏪 State Management

- **Zustand**: Primary state management with persistence
  - `auth-store.ts` - Authentication state with localStorage persistence
  - Middleware pattern for persistence configuration
- **React Query**: Server state management with caching and synchronization
- **Local state**: React hooks for component-level state

**Example Zustand store:**

```typescript
// src/store/auth-store.ts
interface AuthState {
  token: string | null;
  user: IUser | null;
  hasHydrated: boolean;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      hasHydrated: false,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
```

### 🎨 Component & UI Convention

- **Shadcn/ui**: Component library with consistent styling
- **Class Variance Authority (CVA)**: For component variants (see `button.tsx`)
- **Radix UI**: Underlying primitives for accessibility
- **Component structure**:
  - Props interfaces with TypeScript
  - Forward refs for DOM elements
  - Consistent className merging with `cn()` utility
- **Feature components**: Organized in `/src/components/feature/` for complex features
- **Plate Editor**: Rich text editor with extensive plugin system

**Example component with CVA:**

```typescript
// src/components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
```

### 📝 Naming & Code Style

- **File naming**:
  - Components: `PascalCase.tsx` (e.g., `MainEditor.tsx`)
  - Hooks: `camelCase.ts` (e.g., `useVocabularyQueries.tsx`)
  - Services: `camelCase.ts` (e.g., `authApi.ts`)
  - Pages: `page.tsx` (Next.js convention)
- **Function naming**: camelCase for functions, PascalCase for components
- **Constants**: UPPER_SNAKE_CASE for route names and enums
- **TypeScript**: Strict typing with interfaces and type definitions
- **Path aliases**: `@/` for src directory imports

**Example naming patterns:**

```typescript
// File: src/feature/vocabulary/components/VocabularyCard.tsx
export function VocabularyCard({ vocabulary }: VocabularyCardProps) {
  // Component function: PascalCase
}

// File: src/feature/vocabulary/hooks/useVocabularyQueries.tsx
export const useVocabularies = (params: VocabularyQueryParams) => {
  // Hook function: camelCase starting with 'use'
};

// File: src/constraints/route-name.ts
export enum RouteNames {
  HOME = "/home",
  VOCABULARY = "/lesson/vocabulary",
  VOCABULARY_CREATE = "/lesson/vocabulary/create",
}
```

### 🛠️ Development Tools & Configuration

- **Next.js 14**: App Router with TypeScript
- **Tailwind CSS**: Utility-first styling with custom design system
- **ESLint**: Code linting with Next.js and Tailwind plugins
- **TypeScript**: Strict mode with path mapping
- **Swagger integration**: Auto-generated API types from OpenAPI spec
- **Conventional Commits**: Scoped commits (ui, logic)

### 🧪 Testing & Utilities

- **Utility functions**: Centralized in `/src/lib/` and `/src/hooks/`
- **Custom hooks**: Reusable logic (e.g., `useDebounce`, `useMediaQuery`)
- **Error handling**: Global `handleApiError` utility
- **File handling**: Upload utilities with UploadThing integration

### 🎯 Project-Specific Patterns

- **Route management**: Centralized route names in `route-name.ts` enum
- **Authentication**: JWT-based with refresh token handling
- **File uploads**: UploadThing integration for file management
- **AI integration**: Multiple AI services (OpenAI, Deepgram, etc.)
- **Rich text editing**: Plate editor with extensive plugin ecosystem
- **Internationalization**: next-i18next for multi-language support
