import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

// Primer nombre del estudiante para saludarlo; vacío si no hay sesión.
function useStudentName() {
  const [name, setName] = useState('')

  useEffect(() => {
    let active = true
    supabase.auth.getUser().then(({ data }) => {
      const fullName = data?.user?.user_metadata?.full_name?.trim() ?? ''
      if (active) setName(fullName.split(/\s+/)[0] ?? '')
    }).catch(() => {})
    return () => {
      active = false
    }
  }, [])

  return name
}

export default useStudentName
