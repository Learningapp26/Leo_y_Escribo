import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const location = useLocation()

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location])

  return null
}

export default ScrollToTop
