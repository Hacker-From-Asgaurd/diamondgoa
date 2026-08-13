import React from 'react'
import heroImage from './assets/hh-goa-home.png'

export default function App() {
  const handleCreateIdentity = () => {
    // Replace this with your real identity-generator route.
    window.location.href = '/identity'
  }

  return (
    <main className="home">
      <section className="hero" aria-label="Hacker House Goa 2026">
        <img
          className="hero-image"
          src={heroImage}
          alt="Hacker House Goa 2026 homepage artwork"
        />

        {/* This is an invisible clickable layer positioned over the
            CREATE MY IDENTITY button already present in the artwork. */}
        <button
          className="identity-hotspot"
          onClick={handleCreateIdentity}
          aria-label="Create my identity"
          type="button"
        />
      </section>
    </main>
  )
}
