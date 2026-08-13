import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UnifiedPage } from './pages/UnifiedPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<UnifiedPage />} />
      <Route path="/builder" element={<UnifiedPage />} />
      <Route path="/create-identity" element={<UnifiedPage />} />
      <Route path="/create-identity/pfp" element={<UnifiedPage />} />
      <Route path="/create-identity/builder" element={<UnifiedPage />} />
      <Route path="/share/:imageId" element={<UnifiedPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
