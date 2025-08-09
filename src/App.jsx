import React, { Suspense } from 'react';
import Background from './components/Background';
import StaticBackground from './components/StaticBackground';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  return (
    <>
      <Suspense fallback={<StaticBackground />}>
        <Background />
      </Suspense>
      <AnimatedRoutes />
    </>
  );
}

export default App;
