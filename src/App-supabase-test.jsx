// src/App.jsx
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

function Auth() {
  const email = 'work.shaunq@gmail.com'
  const sendMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: 'http://localhost:5173' } // important
    })
    alert(error ? 'Error: ' + error.message : 'Magic link sent to ' + email)
  }
  return (
    <div style={{ maxWidth: 420, margin: '2rem auto' }}>
      <h2>Login (Fixed Email)</h2>
      <button onClick={sendMagicLink}>Send Magic Link</button>
      <p style={{ fontSize: 12, opacity: 0.7 }}>
        Tip: open the link in the same machine. You’ll be redirected back here.
      </p>
    </div>
  )
}

function ProfileTest({ user }) {
  const [msg, setMsg] = useState('')
  const saveProfile = async () => {
    const uid = user?.id
    if (!uid) return setMsg('Not logged in.')
    const { error } = await supabase
      .from('profiles')
      .upsert([{ id: uid, full_name: 'Shaun Q (Test)' }], { onConflict: 'id' })
    setMsg(error ? error.message : '✅ Profile saved.')
  }
  return (
    <div style={{ maxWidth: 420, margin: '2rem auto' }}>
      <h3>Welcome</h3>
      <button onClick={saveProfile}>Save My Profile</button>
      <p>{msg}</p>
    </div>
  )
}

export default function App() {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // 1) Force-set the session if we arrived via magic link (hash fragment)
    const hash = window.location.hash
    const params = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash)
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    if (access_token && refresh_token) {
      supabase.auth.setSession({ access_token, refresh_token }).then(({ data, error }) => {
        if (!error) {
          setSession(data.session)
          setUser(data.session?.user ?? null)
          // optional: clean up the hash so it looks nice
          history.replaceState(null, '', window.location.pathname)
        }
      })
    } else {
      // 2) Otherwise load any existing session and subscribe to changes
      supabase.auth.getSession().then(({ data }) => {
        setSession(data.session ?? null)
        setUser(data.session?.user ?? null)
      })
    }

    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess ?? null)
      setUser(sess?.user ?? null)
    })
    return () => sub.subscription?.unsubscribe?.()
  }, [])

  return session ? <ProfileTest user={user} /> : <Auth />
}
