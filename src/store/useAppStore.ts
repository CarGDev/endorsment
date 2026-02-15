import create from 'zustand'
import { User } from '../types/User'
import { Post } from '../types/Post'
import { seedUsers, seedPosts } from '../mock/seedData'

type UIState = { isCreatePostOpen: boolean }

type AppState = {
  users: User[]
  posts: Post[]
  currentUserId: string | null
  selectedPostId: string | null
  ui: UIState
  seedData: () => void
  createUser: (data: { name: string; email: string; bio: string; specialties: string[] }) => User
  setCurrentUser: (id: string | null) => void
  createPost: (data: { authorId: string; content: string; attachedPDF?: { name: string; url: string } }) => Post
  endorseUser: (userId: string, specialty: string) => void
  endorsePost: (postId: string) => void
  attachPDFToPost: (postId: string, file: File) => void
  setSelectedPost: (id: string | null) => void
  toggleCreatePost: () => void
}

const makeId = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? (crypto as any).randomUUID() : 'id-' + Date.now())

const useAppStore = create<AppState>((set, get) => ({
  users: [],
  posts: [],
  currentUserId: null,
  selectedPostId: null,
  ui: { isCreatePostOpen: false },

  seedData: () => {
    const users = seedUsers()
    const posts = seedPosts(users)
    set(() => ({ users, posts }))
  },

  createUser: (data) => {
    const id = makeId()
    const newUser: User = {
      id,
      name: data.name,
      email: data.email,
      bio: data.bio,
      specialties: data.specialties,
      endorsements: {},
      createdAt: Date.now(),
    }
    set((state) => ({ users: [newUser, ...state.users], currentUserId: id }))
    return newUser
  },

  setCurrentUser: (id) => set(() => ({ currentUserId: id })),

  createPost: (data) => {
    const id = makeId()
    const newPost: Post = {
      id,
      authorId: data.authorId,
      content: data.content,
      attachedPDF: data.attachedPDF,
      endorsements: 0,
      createdAt: Date.now(),
    }
    set((state) => ({ posts: [newPost, ...state.posts] }))
    return newPost
  },

  endorseUser: (userId, specialty) => {
    set((state) => ({
      users: state.users.map((u) => {
        if (u.id !== userId) return u
        const current = { ...u.endorsements }
        current[specialty] = (current[specialty] || 0) + 1
        return { ...u, endorsements: current }
      }),
    }))
  },

  endorsePost: (postId) => {
    set((state) => ({
      posts: state.posts.map((p) => (p.id === postId ? { ...p, endorsements: p.endorsements + 1 } : p)),
    }))
  },

  attachPDFToPost: (postId, file) => {
    const url = URL.createObjectURL(file)
    set((state) => ({
      posts: state.posts.map((p) => (p.id === postId ? { ...p, attachedPDF: { name: file.name, url } } : p)),
    }))
  },

  setSelectedPost: (id) => set(() => ({ selectedPostId: id })),

  toggleCreatePost: () => set((state) => ({ ui: { isCreatePostOpen: !state.ui.isCreatePostOpen } })),
}))

export default useAppStore
