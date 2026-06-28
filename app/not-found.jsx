'use client'
export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
      <p style={{ fontSize: '1.25rem', marginTop: '1rem' }}>Page introuvable</p>
      <a href="/" style={{ display: 'inline-block', marginTop: '2rem', padding: '0.75rem 1.5rem', background: '#1e40af', color: 'white', borderRadius: '0.5rem', textDecoration: 'none' }}>
        Retour à l'accueil
      </a>
    </div>
  )
}
