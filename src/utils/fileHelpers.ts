export const formatTime = (ts: number) => {
  const diff = Date.now() - ts
  const sec = Math.floor(diff / 1000)
  if (sec < 60) return `${sec}s`
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h`
  const day = Math.floor(hr / 24)
  return `${day}d`
}

export const generateToken = (length = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let out = ''
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)]
  }
  return out
}

export const generateRandomMarkdown = () => {
  const titles = ['On the Scalability of Models', 'A Study of Cognitive Load', 'Climate Data Methods', 'Quantum Signaling']
  const title = titles[Math.floor(Math.random() * titles.length)]
  const intro = 'This is a randomly generated abstract for demo purposes.'
  const methods = '- Data collection\n- Analysis\n- Validation'
  const results = 'Preliminary results indicate promising directions.'
  const conclusion = 'Conclusion: more work is required.'
  const content = `# ${title}\n\n${intro}\n\n## Methods\n${methods}\n\n## Results\n${results}\n\n## Conclusion\n${conclusion}`
  const name = `${title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}.md`
  return { name, content }
}
