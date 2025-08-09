import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const bootUpLines = [
  "SYSTEM CHECK...",
  "CONNECTION VERIFIED.",
  "ACCOUNT: Kirito",
  "CALIBRATING SENSORS...",
  "LOADING NERVEGEAR DRIVERS...",
  "ALL SYSTEMS GO.",
];

const Login = () => {
  const [stage, setStage] = useState('initial');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLinkStart = () => {
    setStage('booting');

    // After boot-up text, start the dive
    setTimeout(() => {
      setStage('dive');
    }, (bootUpLines.length + 1) * 500);

    // After dive, transition to menu
    setTimeout(() => {
      login();
      navigate('/menu');
    }, (bootUpLines.length + 1) * 500 + 4000); // Total animation time
  };

  return (
    <div className="bg-black text-white h-screen flex flex-col justify-center items-center overflow-hidden relative">
      <AnimatePresence>
        {stage === 'initial' && (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1 }}
          >
            <button
              onClick={handleLinkStart}
              className="text-4xl text-white border-4 border-cyan-300 px-10 py-5 tracking-widest hover:bg-cyan-300 hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.5)]"
            >
              LINK START
            </button>
          </motion.div>
        )}

        {stage === 'booting' && (
          <motion.div key="booting" className="font-mono text-2xl text-green-400">
            <AnimatePresence>
              {bootUpLines.map((line, index) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.5 }}
                >
                  {line}
                </motion.p>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === 'dive' && (
        <motion.div key="dive" className="absolute inset-0 w-full h-full">
          {/* Color Streaks */}
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: '100vh', opacity: 0 }}
              animate={{ y: '-100vh', opacity: [0, 1, 0] }}
              transition={{ delay: Math.random() * 1, duration: 1.5 + Math.random(), ease: 'linear', repeat: Infinity }}
              style={{ position: 'absolute', left: `${Math.random() * 100}%`, width: '2px', height: '150px', background: `linear-gradient(to bottom, transparent, ${['#00aaff', '#00ffaa', '#aaff00'][i % 3]}, transparent)` }}
            />
          ))}
          {/* HUD Rings */}
          <motion.div
            className="absolute border-4 border-cyan-400 rounded-full"
            initial={{ opacity: 0, scale: 3, x: '-50%', y: '-50%', top: '50%', left: '50%' }}
            animate={{ opacity: [0, 0.5, 0], scale: 0.5 }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
            style={{ width: '80vmin', height: '80vmin' }}
          />
          <motion.div
            className="absolute border-2 border-green-400 rounded-full"
            initial={{ opacity: 0, scale: 0.2, x: '-50%', y: '-50%', top: '50%', left: '50%' }}
            animate={{ opacity: [0, 0.5, 0], scale: 2 }}
            transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
            style={{ width: '60vmin', height: '60vmin' }}
          />
          {/* Light Tunnel & Flash */}
           <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 2.5, duration: 1 }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Login;
