export interface AttachedPDF {
  name: string
  url: string
}

export interface Post {
  id: string
  authorId: string
  content: string
  attachedPDF?: AttachedPDF
  endorsements: number
  createdAt: number
}
