import { supabase } from './lib/supabase'

export default function Auth() {
  const email = 'work.shaunq@gmail.com'

  const sendMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: 'http://localhost:5173' } // 👈 important
    })
    alert(error ? 'Error: ' + error.message : 'Magic link sent to ' + email)
  }

  return (
    <div style={{ maxWidth: 360, margin: '2rem auto' }}>
      <h2>Login (Fixed Email)</h2>
      <button onClick={sendMagicLink}>Send Magic Link</button>
    </div>
  )
}
