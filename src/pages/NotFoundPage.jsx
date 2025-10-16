import { Link } from 'react-router-dom'

export default function NotFoundPage(){
  return (
    <main className="container py-24 text-center">
      <h1 className="text-4xl font-semibold text-gold mb-4">Page not found</h1>
      <p className="text-white/70 mb-8">
        The page you were looking for may have moved or is still under construction.
      </p>
      <Link to="/" className="inline-flex items-center px-4 py-2 rounded-lg border border-gold/40 text-gold hover:bg-gold/15 transition">
        Return home
      </Link>
    </main>
  )
}
