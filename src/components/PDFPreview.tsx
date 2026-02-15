import React, { useEffect } from 'react'

const PDFPreview: React.FC<{ url: string; name?: string }> = ({ url, name }) => {
  useEffect(() => {
    return () => {
      // only revoke blob URLs
      try {
        if (url && url.startsWith('blob:')) URL.revokeObjectURL(url)
      } catch (e) {
        // ignore
      }
    }
  }, [url])

  return (
    <div>
      <div className="small">{name}</div>
      <iframe src={url} width="100%" height={300} title={name ?? 'pdf'} />
    </div>
  )
}

export default PDFPreview
