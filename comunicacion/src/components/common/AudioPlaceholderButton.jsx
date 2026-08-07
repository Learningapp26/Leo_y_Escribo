import { Volume2 } from 'lucide-react'

import Button from './Button'

// Se usa mientras el audio indicado aún no está disponible en public/audio.
function AudioPlaceholderButton({ children, fullWidth = false, size = 'medium' }) {
  return (
    <Button
      variant="audio"
      size={size}
      icon={Volume2}
      fullWidth={fullWidth}
      disabled
      title="Audio próximamente disponible"
    >
      {children}
    </Button>
  )
}

export default AudioPlaceholderButton
