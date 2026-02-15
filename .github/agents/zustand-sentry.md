---
name: "Zustand Sentry"
description: "Generates a persisted Zustand store for endorsements and likes (localStorage)."
triggers:
  - "generate zustand store"
  - "persist endorsements to localStorage"
  - "create social store"
---

# Zustand Sentry

Purpose
- Manage social state (endorsements, likes) in the frontend using `zustand` + `persist` so no backend is required.

Example prompts
- "generate a zustand store for endorsements and likes"
- "create a persisted store to save endorsements in localStorage"

Output
- Creates `src/stores/useSocialStore.ts` with a typed Zustand store (persisted to localStorage) that exposes: `endorsements`, `likes`, `addEndorsement`, `toggleLike`, and `reset`.

Code (generated file: src/stores/useSocialStore.ts)
```ts
import create from 'zustand'
import { persist } from 'zustand/middleware'

type Endorsement = {
  id: string
  paperId: string
  userId: string
  message?: string
  createdAt: string
}

type SocialState = {
  endorsements: Record<string, Endorsement[]>
  likes: Record<string, string[]>
  addEndorsement: (paperId: string, endorser: Omit<Endorsement,'id'|'createdAt'>) => void
  toggleLike: (paperId: string, userId: string) => void
  reset: () => void
}

export const useSocialStore = create<SocialState>(persist(
  (set) => ({
    endorsements: {},
    likes: {},
    addEndorsement: (paperId, endorser) => set((state) => {
      const list = state.endorsements[paperId] ?? []
      const newItem = {
        id: (typeof crypto !== 'undefined' && (crypto as any).randomUUID) ? (crypto as any).randomUUID() : Date.now().toString(),
        ...endorser,
        createdAt: new Date().toISOString()
      }
      return { endorsements: { ...state.endorsements, [paperId]: [...list, newItem] } }
    }),
    toggleLike: (paperId, userId) => set((state) => {
      const users = state.likes[paperId] ?? []
      const has = users.includes(userId)
      return { likes: { ...state.likes, [paperId]: has ? users.filter(u => u !== userId) : [...users, userId] } }
    }),
    reset: () => ({ endorsements: {}, likes: {} })
  }),
  { name: 'arxiv-social-storage' }
))

export default useSocialStore
```

Notes
- Recommend adding `zustand` and `zustand/middleware` to dependencies and documenting wiring examples in components.
