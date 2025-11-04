import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

export default function ProfileTest() {
  const [uid, setUid] = useState<string | null>(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUid(data.user?.id ?? null))
  }, [])

  const saveProfile = async () => {
    if (!uid) {
      setMsg('Please log in first.')
      return
    }
    const { error } = await supabase
      .from('profiles')
      .upsert([{ id: uid, full_name: 'Shaun Q (Test)' }], { onConflict: 'id' })
    setMsg(error ? error.message : '✅ Profile saved.')
  }

  return (
    <div style={{ maxWidth: 360, margin: '1rem auto' }}>
      <button onClick={saveProfile}>Save My Profile</button>
      <p>{msg}</p>
    </div>
  )
}
