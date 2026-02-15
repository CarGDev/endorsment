# Endorsement — Researcher Endorsement & Collaboration Platform

A frontend-only React application (Vite + TypeScript + Zustand) that simulates a lightweight academic social feed for junior researchers to showcase work and obtain endorsements. This repository contains a mock, client-side-only implementation with in-memory state managed by Zustand.

Live preview (intended host): https://endorsment.cargdev.io

Author
- Name: cargdev
- Contact: carlos.gutierrez@carg.dev
- Website: https://cargdev.io
- GitHub: https://github.com/CarGDev/endorsment

Screenshot

![Endorsement Home](/assets/Endorsement_HomePage.png)

Quick start

1. npm install
2. npm run dev
3. Open http://localhost:5173

Features
- Create user profiles with specialties
- Create posts with in-memory Markdown attachments
- Endorse users by specialty and endorse posts
- Share endorsement links (copies a generated arXiv-style URL)
- Notifications for in-app actions (top-right)
- Simple responsive layout with feed and suggestions

Project structure

src/
- main.tsx
- App.tsx
- routes/
  - Home.tsx
  - Profile.tsx
  - CreateUser.tsx
  - PostDetail.tsx
- components/
  - Navbar.tsx
  - Feed.tsx
  - PostCard.tsx
  - UserCard.tsx
  - EndorseButton.tsx
  - MarkdownPreview.tsx
  - CreatePostModal.tsx
  - NotificationCenter.tsx
- store/
  - useAppStore.ts
- types/
  - User.ts
  - Post.ts
- mock/
  - seedData.ts
- utils/
  - fileHelpers.ts

Notes
- This project is intentionally frontend-only. No backend or server is required.
- Markdown rendering is minimal and for demo purposes only — do not render untrusted input in production without sanitization.

License
MIT
