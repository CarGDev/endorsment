# Copilot Instructions — Researcher Endorsement & Collaboration Platform (Frontend-Only)

Purpose

This file is the authoritative project instruction for the frontend-only Researcher Endorsement & Collaboration Platform. It describes the stack, architecture, data model, Zustand store design, component responsibilities, routing, PDF handling, seeding strategy, dev commands, and React 19 considerations so Copilot agents and contributors can scaffold, modify, test, and demo the app without a backend.

Overview

- Frontend-only React application (React 19) built with Vite and TypeScript (strict mode).
- Global state management with Zustand (persist optional). No Redux. No backend or server-side rendering.
- Mock data loaded at start from `src/mock/seedData.ts` and used by services and the store.
- PDF attachments are stored as in-memory object URLs (URL.createObjectURL) or placeholder URLs in seed data; do not attempt server uploads.

Tech Stack

- React 19 (functional components only)
- Vite (latest)
- TypeScript (strict)
- Zustand (+ optional middleware: persist, devtools)
- React Router v6+
- Tailwind CSS (preferred) or lightweight CSS modules
- uuid or crypto.randomUUID for IDs (fallback to Date.now())

Project goals

- Let researchers create profiles (specialties) and post updates including attached PDFs.
- Allow endorsing users (per-specialty) and endorsing posts.
- Entire app runs client-side with realistic mock data, enabling demos and CLI-driven scaffolding.

Folder structure (recommended)

src/
  main.tsx
  App.tsx
  routes/
    Home.tsx
    Profile.tsx
    CreateUser.tsx
    PostDetail.tsx
  components/
    Navbar.tsx
    Feed.tsx
    PostCard.tsx
    UserCard.tsx
    EndorseButton.tsx
    PDFPreview.tsx
    CreatePostModal.tsx
  store/
    useAppStore.ts
  types/
    User.ts
    Post.ts
  mock/
    seedData.ts
  hooks/
    useCurrentUser.ts
  services/
    mockApi.ts
  utils/
    fileHelpers.ts

Type definitions (examples)

// src/types/User.ts
export interface User {
  id: string
  name: string
  email: string
  bio: string
  specialties: string[]
  endorsements: Record<string, number>
  createdAt: number // Date.now()
}

// src/types/Post.ts
export interface Post {
  id: string
  authorId: string
  content: string
  attachedPDF?: {
    name: string
    url: string
  }
  endorsements: number
  createdAt: number // Date.now()
}

Zustand store design (src/store/useAppStore.ts)

- Use TypeScript generics for the store interface and actions.
- State shape:
  - users: User[]
  - posts: Post[]
  - currentUserId: string | null
  - selectedPostId: string | null
  - ui: { isCreatePostOpen: boolean }
- Actions (signatures):
  - seedData(): void
  - createUser(data: Omit<User, 'id' | 'createdAt' | 'endorsements'>): string
  - setCurrentUser(id: string | null): void
  - createPost(data: { authorId: string; content: string; file?: File | null }): string
  - endorseUser(userId: string, specialty: string): void
  - endorsePost(postId: string): void
  - attachPDFToPost(postId: string, file: File): void
  - toggleCreatePost(): void
  - reset(): void

Implementation notes

- Always use functional updates to maintain immutability:
  set((state) => ({ posts: [newPost, ...state.posts] }))
- For IDs: use `crypto.randomUUID()` when available, else fallback to `String(Date.now())`.
- Use timestamps (numbers) for createdAt to simplify serialization: `Date.now()`.
- If using `persist`, be aware object URLs cannot be serialized; persist only primitive fields or placeholder URLs and avoid persisting File or object URL references.

PDF handling

- When a user attaches a PDF in the CreatePostModal:
  1. Validate file type is `application/pdf`; reject others.
  2. Create an object URL: `const url = URL.createObjectURL(file)`.
  3. Store `{ name: file.name, url }` on the post object in the store.
  4. In PDFPreview component, render `<iframe src={url} />` or an `<embed>`.
  5. Revoke object URL on component unmount with `URL.revokeObjectURL(url)`; avoid revoking while still referenced by the store/view.
- If implementing persistence: instead store a placeholder downloadable URL in `seedData` and do not persist object URLs.

Seeding (src/mock/seedData.ts)

- Create at least 5 users with distinct specialties, e.g.:
  - AI (cs.AI)
  - Neuroscience
  - Climate Science
  - Quantum Physics
  - Economics
- Create 10 posts distributed across those authors; include 2–3 posts with `attachedPDF` as placeholder URLs.
- Add some pre-existing endorsement counts per user specialty.
- Provide `seedData()` helper that `useAppStore` calls at app init if state is empty.

Routing (React Router v6+)

- Routes to implement:
  - `/` → Home (Feed view)
  - `/profile/:id` → Profile page
  - `/create-user` → CreateUser page
  - `/post/:id` → PostDetail page
- Use `<BrowserRouter>` in main.tsx.

Home page layout

- Centered feed with max-width ~900px.
- Two-column desktop layout (feed + sidebar). Sidebar hidden on small screens.
- Floating Create Post button (controlled by `ui.isCreatePostOpen`).
- Sidebar shows suggested users (3 random users excluding current user).

PostCard responsibilities

- Show author name (link to /profile/:id), specialties as tags, content, attached PDF preview, endorse button, and timestamp.
- Use `React.memo` to avoid re-renders when unrelated state changes.
- Only select the slice of store state needed: e.g., `useAppStore((s) => ({ post: s.posts.find(p => p.id===id), endorsePost: s.endorsePost }), shallow)`.

Endorsement logic

- Endorse a user's specialty from their profile: increments `user.endorsements[specialty]`.
- Endorse a post: increments `post.endorsements`.
- Prevent self-endorsement: if `currentUserId === targetUserId`, disable the endorsement action.
- Provide optimistic UI updates: update the store synchronously; rollback only on detected invariant violations (rare since no server).
- Optional: Prevent duplicate endorsements from the same session by tracking `sessionEndorsements: Record<string, Set<string>>` in memory (not persisted) if desired.

Create User flow

- Form fields: name, email, bio, specialties (comma-separated).
- On submit: validate fields, parse specialties to array, generate id (uuid), createdAt = Date.now(), endorsements = {} (zeroed specialties), add to store, set as current user, navigate to profile.

Create Post Modal

- Controlled by `ui.isCreatePostOpen` in store.
- Fields: textarea (required), file input (accept PDF).
- On submit:
  - Validate currentUser exists else disable submit.
  - If file, create object URL and attach.
  - Use `startTransition(() => createPost(...))` to avoid blocking UI.
  - Close modal after optimistic update.

Performance recommendations

- Use selective selectors: read minimal data slices from Zustand to reduce re-renders.
- Use `React.memo` and `useCallback` where appropriate.
- Format long lists with virtualization only if needed (not required for 10s-100s items in demo).

Accessibility

- Use semantic HTML and label inputs.
- Ensure keyboard access to modal and focus trap.
- Buttons should have accessible names (aria-label when icon-only).
- PDF iframe should have title attribute for screen readers.

Testing (optional but recommended)

- Use Vitest + @testing-library/react.
- Test PostCard rendering, endorse button behavior (calls `endorsePost`), and CreateUser flow.

Dev commands

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Test: `npm run test`
- Lint/format: `npm run lint` / `npm run format`

React 19-specific guidance

- Use `startTransition` for heavy UI updates (e.g., creating a new post and rerendering many components).
- Prefer modern hooks patterns and avoid legacy lifecycle logic.

Persistence notes (optional enhancement)

- If enabling `persist` middleware on Zustand, exclude or adapt `attachedPDF.url` handling since object URLs are not serializable.
- Best pattern: persist posts and users (primitive fields) and persist `attachedPDF` only if it is a stable URL (seeded placeholder), not object URLs created from local Files.

Edge cases & Validation

- No current user → disable post creation and show CTA to create/select a user.
- Invalid PDF type → show validation error and reject the file.
- Empty feed → display an empty state and suggested actions.

How agents should use this file

- Use this instruction to scaffold files, create stores, seed data, and generate components that conform to the types and store signatures above.
- Agents that generate files should place them under the `src/` paths listed here and reference the types in `src/types`.
- When generating tests or docs, reference the sample data and the `seedData.ts` location.