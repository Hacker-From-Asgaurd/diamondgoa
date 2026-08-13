import React from "react";
import "./App.css";

const ASSET = "/assets/";

export default function App() {
  const handleCreateIdentity = () => {
    // Replace this with your existing identity-generator route/function.
    window.location.href = "/builder";
  };

  return (
    <main className="home">
      <header className="topbar">
        <img className="studio-logo" src={`${ASSET}studio.png`} alt="2:47 PM Studio" />
      </header>

      <section className="hero">
        <div className="title-wrap">
          <img className="hacker-title" src={`${ASSET}hacker-house.png`} alt="Hacker House" />
          <img className="goa-logo" src={`${ASSET}goa.png`} alt="Goa" />
        </div>

        <div className="event-meta">
          <span>GOA, INDIA</span>
          <span className="dot">•</span>
          <span>28 – 31 OCT 2026</span>
          <span className="studio-text">2:47 PM STUDIO</span>
        </div>

        <div className="tagline">BUILD <span>•</span> CREATE <span>•</span> DISRUPT</div>

        <button className="identity-button" onClick={handleCreateIdentity}>
          <span>CREATE MY IDENTITY</span>
          <span className="arrow">→</span>
        </button>
      </section>

      <img
        className="beach-art"
        src={`${ASSET}goa-beach.png`}
        alt=""
        aria-hidden="true"
      />
    </main>
  );
}
