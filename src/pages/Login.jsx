import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLinking, setIsLinking] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLinkStart = () => {
    setIsLinking(true);
    // Simulate animation and login process
    setTimeout(() => {
      login();
      navigate('/menu');
    }, 3000); // 3-second animation
  };

  const lineVariants = {
    hidden: { y: '100vh' },
    visible: (i) => ({
      y: '-100vh',
      transition: {
        delay: i * 0.02,
        duration: 1.5,
        ease: 'linear',
      },
    }),
  };

  return (
    <div className="bg-black text-white h-screen flex flex-col justify-center items-center overflow-hidden">
      <AnimatePresence>
        {!isLinking ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl font-bold mb-8 text-cyan-400">Welcome to the SAO CV</h1>
            <button
              onClick={handleLinkStart}
              className="text-4xl text-white border-4 border-white px-10 py-5 tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              LINK START
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-4xl text-cyan-400 z-10">LINKING...</p>
            </div>
            <div className="absolute inset-0">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={lineVariants}
                  style={{
                    position: 'absolute',
                    left: `${Math.random() * 100}%`,
                    width: '2px',
                    height: `${Math.random() * 200 + 100}px`,
                    background: `linear-gradient(to bottom, rgba(0, 255, 255, 0), rgba(0, 170, 255, 1), rgba(0, 255, 255, 0))`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
