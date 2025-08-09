import React from 'react';

const StaticBackground = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-[-1] bg-gray-900"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(0, 170, 255, 0.1), transparent 30%),
          radial-gradient(circle at 80% 70%, rgba(0, 170, 255, 0.1), transparent 30%)
        `,
      }}
    />
  );
};

export default StaticBackground;
