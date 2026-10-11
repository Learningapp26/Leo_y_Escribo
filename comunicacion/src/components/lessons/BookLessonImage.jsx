import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

// Keeps the printed drawing's space while its illustration is still pending.
function BookLessonImage({ src, alt, featured = false }) {
  const [missing, setMissing] = useState(false)
  const className = `selection-image${featured ? ' selection-image--featured' : ''}`
  if (missing) {
    return <span className={`${className} selection-image--pending`} role="img" aria-label={`${alt} (imagen pendiente)`}>
      <ImageIcon aria-hidden="true" size={40} />
      {/* A featured prompt may hide its word on purpose; options must stay choosable. */}
      {!featured && <span aria-hidden="true">{alt}</span>}
    </span>
  }
  return <img className={className} src={src} alt={alt} onError={() => setMissing(true)} />
}

export default BookLessonImage
