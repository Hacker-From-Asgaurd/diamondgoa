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

  const isPfp = location.pathname === '/create-identity/pfp';
  const isBuilder = location.pathname === '/create-identity/builder';
  const isShare = location.pathname.startsWith('/share/');

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
      const scrollBehavior = isInitial.current ? 'auto' : 'smooth';
      const delay = 100; // 100ms delay to guarantee DOM mounting before scrolling

      const timer = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
        }
      }, delay);

      isInitial.current = false;
      return () => clearTimeout(timer);
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
      {isPfp && (
        <section id="pfp-creator">
          <PfpCreatorPage />
        </section>
      )}
      {isBuilder && (
        <section id="builder-creator">
          <BuilderIdCreatorPage />
        </section>
      )}
      {isShare && (
        <section id="share-result">
          <SharePage />
        </section>
      )}
    </div>
  );
};

export default UnifiedPage;
