import { User } from '../types/User'
import { Post } from '../types/Post'

const now = Date.now()

export const seedUsers = (): User[] => {
  const users: User[] = [
    {
      id: 'u-ai',
      name: 'Ava Li',
      email: 'ava@example.com',
      bio: 'Researcher in applied AI and ML systems.',
      specialties: ['AI', 'Machine Learning', 'NLP'],
      endorsements: { AI: 3, 'Machine Learning': 2 },
      createdAt: now - 1000 * 60 * 60 * 24 * 10,
    },
    {
      id: 'u-neuro',
      name: 'Daniel Kim',
      email: 'daniel@example.com',
      bio: 'Neuroscience and cognitive modeling.',
      specialties: ['Neuroscience', 'Cognitive Science'],
      endorsements: { Neuroscience: 4 },
      createdAt: now - 1000 * 60 * 60 * 24 * 9,
    },
    {
      id: 'u-climate',
      name: 'Maria Gomez',
      email: 'maria@example.com',
      bio: 'Climate science and environmental data.',
      specialties: ['Climate Science', 'Data Analysis'],
      endorsements: { 'Climate Science': 1 },
      createdAt: now - 1000 * 60 * 60 * 24 * 8,
    },
    {
      id: 'u-quantum',
      name: 'Liam O\'Connor',
      email: 'liam@example.com',
      bio: 'Quantum information and condensed matter.',
      specialties: ['Quantum Physics', 'Condensed Matter'],
      endorsements: { 'Quantum Physics': 2 },
      createdAt: now - 1000 * 60 * 60 * 24 * 7,
    },
    {
      id: 'u-econ',
      name: 'Sofia Patel',
      email: 'sofia@example.com',
      bio: 'Behavioral economics and market design.',
      specialties: ['Economics', 'Behavioral Economics'],
      endorsements: { Economics: 5 },
      createdAt: now - 1000 * 60 * 60 * 24 * 6,
    },
  ]
  return users
}

export const seedPosts = (users: User[]): Post[] => {
  const samplePDF = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  const posts: Post[] = [
    { id: 'p1', authorId: users[0].id, content: 'Working on a new transformer variant.', attachedPDF: { name: 'paper.pdf', url: samplePDF }, endorsements: 2, createdAt: now - 1000 * 60 * 30 },
    { id: 'p2', authorId: users[1].id, content: 'New results on memory consolidation in models.', endorsements: 1, createdAt: now - 1000 * 60 * 60 * 2 },
    { id: 'p3', authorId: users[2].id, content: 'Dataset release for coastal temperature anomalies.', endorsements: 0, createdAt: now - 1000 * 60 * 60 * 5 },
    { id: 'p4', authorId: users[3].id, content: 'Simulations of topological phases.', endorsements: 3, createdAt: now - 1000 * 60 * 60 * 24 },
    { id: 'p5', authorId: users[4].id, content: 'Market design experiment planned next month.', endorsements: 4, createdAt: now - 1000 * 60 * 60 * 24 * 2 },
    { id: 'p6', authorId: users[0].id, content: 'Trying a new optimization schedule.', endorsements: 1, createdAt: now - 1000 * 60 * 60 * 3 },
    { id: 'p7', authorId: users[1].id, content: 'Open-source code for preprocessing.', endorsements: 2, createdAt: now - 1000 * 60 * 60 * 6 },
    { id: 'p8', authorId: users[2].id, content: 'Collaboration call on climate econometrics.', endorsements: 0, createdAt: now - 1000 * 60 * 60 * 12 },
    { id: 'p9', authorId: users[3].id, content: 'Preprint draft available.', attachedPDF: { name: 'draft.pdf', url: samplePDF }, endorsements: 1, createdAt: now - 1000 * 60 * 60 * 48 },
    { id: 'p10', authorId: users[4].id, content: 'Survey on lab replication practices.', endorsements: 0, createdAt: now - 1000 * 60 * 60 * 72 },
  ]
  return posts
}
