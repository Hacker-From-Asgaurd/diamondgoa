import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateIdentity = () => {
    navigate('/builder');
  };

  return (
    <main className="home">
      <section className="hero" aria-label="Hacker House Goa 2026">
        <img
          className="hero-image"
          src="/home.png"
          alt="Hacker House Goa 2026 homepage artwork"
        />

        {/* Styled clickable button positioned over the CREATE MY IDENTITY button area in artwork */}
        <button
          className="identity-hotspot"
          onClick={handleCreateIdentity}
          aria-label="Create my identity"
          type="button"
        >
          <span>CREATE MY IDENTITY</span>
          <ArrowRight className="button-arrow" />
        </button>
      </section>
    </main>
  );
};










