export interface AttachedMarkdown {
  name: string
  content: string
}

export interface Post {
  id: string
  authorId: string
  content: string
  attachedMarkdown?: AttachedMarkdown
  endorsements: number
  createdAt: number
}
