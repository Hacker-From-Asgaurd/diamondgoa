import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { HomePage } from './HomePage';
import { IdentityStudioPage } from './IdentityStudioPage';
import { PfpCreatorPage } from './PfpCreatorPage';
import { BuilderIdCreatorPage } from './BuilderIdCreatorPage';
import { SharePage } from './SharePage';

export const UnifiedPage: React.FC = () => {
  const location = useLocation();
  const isInitial = useRef(true);

  useEffect(() => {
    const pathname = location.pathname;
    let sectionId = '';

    if (pathname === '/' || pathname === '') {
      sectionId = 'home';
    } else if (pathname === '/builder' || pathname === '/create-identity') {
      sectionId = 'identity-studio';
    } else if (pathname === '/create-identity/pfp') {
      sectionId = 'pfp-creator';
    } else if (pathname === '/create-identity/builder') {
      sectionId = 'builder-creator';
    } else if (pathname.startsWith('/share/')) {
      sectionId = 'share-result';
    }

    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const scrollBehavior = isInitial.current ? 'auto' : 'smooth';
        const delay = isInitial.current ? 100 : 0;

        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
        }, delay);

        isInitial.current = false;
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname]);

  return (
    <div className="w-full flex flex-col">
      <section id="home">
        <HomePage />
      </section>
      <section id="identity-studio">
        <IdentityStudioPage />
      </section>
      <section id="pfp-creator">
        <PfpCreatorPage />
      </section>
      <section id="builder-creator">
        <BuilderIdCreatorPage />
      </section>
      <section id="share-result">
        <SharePage />
      </section>
    </div>
  );
};

export default UnifiedPage;
