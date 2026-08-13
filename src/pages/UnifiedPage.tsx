import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HomePage } from './HomePage';
import { IdentityStudioPage } from './IdentityStudioPage';
import { PfpCreatorPage } from './PfpCreatorPage';
import { BuilderIdCreatorPage } from './BuilderIdCreatorPage';
import { SharePage } from './SharePage';

let isGlobalInitial = true;

export const UnifiedPage: React.FC = () => {
  const location = useLocation();

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
    }

    if (sectionId) {
      const scrollBehavior = isGlobalInitial ? 'auto' : 'smooth';
      const delay = 200; // 200ms delay to let router/browser scroll-restoration complete

      const timer = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
        }
      }, delay);

      isGlobalInitial = false;
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  if (isPfp) {
    return <PfpCreatorPage />;
  }

  if (isBuilder) {
    return <BuilderIdCreatorPage />;
  }

  if (isShare) {
    return <SharePage />;
  }

  return (
    <div className="w-full flex flex-col">
      <section id="home">
        <HomePage />
      </section>
      <section id="identity-studio">
        <IdentityStudioPage />
      </section>
    </div>
  );
};

export default UnifiedPage;
