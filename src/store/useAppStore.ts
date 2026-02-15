import create from 'zustand';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { seedUsers, seedPosts } from '../mock/seedData';

type UIState = { isCreatePostOpen: boolean };

type EndorsementHistoryItem = {
  id: string;
  type: 'user' | 'post';
  by?: string | null;
  toUserId?: string;
  postId?: string;
  specialty?: string;
  createdAt: number;
};

type Notification = {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  createdAt: number;
};

type AppState = {
  users: User[];
  posts: Post[];
  currentUserId: string | null;
  selectedPostId: string | null;
  ui: UIState;
  endorsementHistory: EndorsementHistoryItem[];
  notifications: Notification[];
  seedData: () => void;
  createUser: (data: { name: string; email: string; bio: string; specialties: string[] }) => User;
  setCurrentUser: (id: string | null) => void;
  createPost: (data: {
    authorId: string;
    content: string;
    attachedMarkdown?: { name: string; content: string };
  }) => Post;
  endorseUser: (userId: string, specialty: string) => void;
  endorsePost: (postId: string) => void;
  attachPDFToPost: (postId: string, file: File) => void;
  attachMarkdownToPost: (postId: string, md: { name: string; content: string }) => void;
  setSelectedPost: (id: string | null) => void;
  toggleCreatePost: () => void;
  addNotification: (
    message: string,
    type?: 'success' | 'error' | 'info',
    duration?: number
  ) => void;
  removeNotification: (id: string) => void;
};

const makeId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? (crypto as any).randomUUID()
    : 'id-' + Date.now();

const useAppStore = create<AppState>((set, get) => ({
  users: [],
  posts: [],
  currentUserId: null,
  selectedPostId: null,
  ui: { isCreatePostOpen: false },
  endorsementHistory: [],
  notifications: [],

  seedData: () => {
    const users = seedUsers();
    const posts = seedPosts(users);
    set(() => ({ users, posts }));
  },

  createUser: (data) => {
    const id = makeId();
    const newUser: User = {
      id,
      name: data.name,
      email: data.email,
      bio: data.bio,
      specialties: data.specialties,
      endorsements: {},
      createdAt: Date.now(),
    };
    set((state) => ({ users: [newUser, ...state.users], currentUserId: id }));
    return newUser;
  },

  setCurrentUser: (id) => set(() => ({ currentUserId: id })),

  createPost: (data) => {
    const id = makeId();
    const newPost: Post = {
      id,
      authorId: data.authorId,
      content: data.content,
      attachedMarkdown: data.attachedMarkdown,
      endorsements: 0,
      createdAt: Date.now(),
    };
    set((state) => ({ posts: [newPost, ...state.posts] }));
    return newPost;
  },

  endorseUser: (userId, specialty) => {
    const by = get().currentUserId ?? null;
    set((state) => ({
      users: state.users.map((u) => {
        if (u.id !== userId) return u;
        const current = { ...u.endorsements };
        current[specialty] = (current[specialty] || 0) + 1;
        return { ...u, endorsements: current };
      }),
      endorsementHistory: [
        { id: makeId(), type: 'user', by, toUserId: userId, specialty, createdAt: Date.now() },
        ...(state.endorsementHistory || []),
      ],
    }));
  },

  endorsePost: (postId) => {
    const by = get().currentUserId ?? null;
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, endorsements: p.endorsements + 1 } : p
      ),
      endorsementHistory: [
        { id: makeId(), type: 'post', by, postId, createdAt: Date.now() },
        ...(state.endorsementHistory || []),
      ],
    }));
  },

  attachPDFToPost: (postId, file) => {
    const url = URL.createObjectURL(file);
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, attachedPDF: { name: file.name, url } } : p
      ),
    }));
  },

  attachMarkdownToPost: (postId, md) => {
    set((state) => ({
      posts: state.posts.map((p) => (p.id === postId ? { ...p, attachedMarkdown: md } : p)),
    }));
  },

  setSelectedPost: (id) => set(() => ({ selectedPostId: id })),

  toggleCreatePost: () =>
    set((state) => ({ ui: { isCreatePostOpen: !state.ui.isCreatePostOpen } })),

  addNotification: (message, type = 'info', duration = 4000) => {
    const id = makeId();
    const notif = { id, message, type, createdAt: Date.now() };
    set((state) => ({ notifications: [notif, ...(state.notifications || [])] }));
    setTimeout(() => {
      set((state) => ({ notifications: (state.notifications || []).filter((n) => n.id !== id) }));
    }, duration);
  },

  removeNotification: (id) =>
    set((state) => ({ notifications: (get().notifications || []).filter((n) => n.id !== id) })),
}));

export default useAppStore;
