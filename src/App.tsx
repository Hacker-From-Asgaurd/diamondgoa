import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { IdentityStudioPage } from './pages/IdentityStudioPage';
import { PfpCreatorPage } from './pages/PfpCreatorPage';
import { BuilderIdCreatorPage } from './pages/BuilderIdCreatorPage';
import { SharePage } from './pages/SharePage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/builder" element={<IdentityStudioPage />} />
      <Route path="/create-identity" element={<IdentityStudioPage />} />
      <Route path="/create-identity/pfp" element={<PfpCreatorPage />} />
      <Route path="/create-identity/builder" element={<BuilderIdCreatorPage />} />
      <Route path="/share/:imageId" element={<SharePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
