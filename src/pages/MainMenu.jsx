import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const menuItems = [
  { path: '/stats', label: 'Stats' },
  { path: '/skills', label: 'Skills' },
  { path: '/inventory', label: 'Inventory' },
  { path: '/questlog', label: 'Quest Log' },
];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const MainMenu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <motion.div
        className="bg-black bg-opacity-70 border-2 border-cyan-400 p-10 rounded-lg shadow-lg shadow-cyan-500/20 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl font-bold text-white text-center mb-8 border-b-2 border-cyan-400 pb-4">
          Main Menu
        </h1>
        <motion.ul className="space-y-4">
          {menuItems.map((item) => (
            <motion.li key={item.path} variants={itemVariants}>
              <Link
                to={item.path}
                className="block w-full text-center text-2xl p-4 bg-gray-800 border-2 border-gray-700 rounded-md text-white hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all duration-300"
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div variants={itemVariants} className="mt-8">
          <button
            onClick={handleLogout}
            className="block w-full text-center text-xl p-3 bg-red-800 border-2 border-red-700 rounded-md text-white hover:bg-red-600 hover:border-red-500 transition-all duration-300"
          >
            Logout
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MainMenu;
