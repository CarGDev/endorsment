import React, { useMemo } from 'react'

const renderMarkdown = (md: string) => {
  if (!md) return ''
  let html = md
  // code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
  // headings
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  // bold / italics
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  // links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
  // lists
  html = html.replace(/^\s*-\s+(.*)$/gim, '<li>$1</li>')
  // wrap list items
  html = html.replace(/(<li>[\s\S]*?<\/li>)/gms, '<ul>$1</ul>')
  // paragraphs
  html = html.replace(/\n{2,}/g, '</p><p>')
  html = `<p>${html}</p>`
  return html
}

const MarkdownPreview: React.FC<{ content: string }> = ({ content }) => {
  const html = useMemo(() => renderMarkdown(content), [content])
  return <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: html }} />
}

export default MarkdownPreview
