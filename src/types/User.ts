export interface User {
  id: string
  name: string
  email: string
  bio: string
  specialties: string[]
  endorsements: Record<string, number>
  createdAt: number
}
