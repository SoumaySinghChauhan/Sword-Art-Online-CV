import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StatBar = ({ label, value, maxValue }) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div>
      <div className="flex justify-between text-lg">
        <span>{label}</span>
        <span>{value} / {maxValue}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-4 mt-1">
        <motion.div
          className={`h-4 rounded-full ${label === 'HP' ? 'bg-green-500' : 'bg-blue-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

const Attribute = ({ label, value }) => (
  <motion.div
    className="flex justify-between items-center bg-gray-800 p-3 rounded-md"
    whileHover={{ scale: 1.05, backgroundColor: '#1F2937' }}
  >
    <span className="text-xl">{label}</span>
    <span className="text-xl font-bold text-cyan-400">{value}</span>
  </motion.div>
);

const Stats = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) {
    return <div className="w-full h-screen flex items-center justify-center text-white">Loading Stats...</div>;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <motion.div
        className="bg-black bg-opacity-70 border-2 border-cyan-400 p-8 rounded-lg shadow-lg shadow-cyan-500/20 w-full max-w-4xl text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-5xl font-bold">{data.profile.name}</h1>
            <p className="text-2xl text-gray-400">{data.profile.title}</p>
          </div>
          <div className="text-3xl font-bold">
            LVL <span className="text-cyan-400">{data.profile.level}</span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <StatBar label="HP" value={data.profile.hp} maxValue={data.profile.hp} />
          <StatBar label="MP" value={data.profile.mp} maxValue={data.profile.mp} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold border-b-2 border-cyan-400 pb-2 mb-4">Attributes</h2>
            <motion.div
              className="space-y-3"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {Object.entries(data.attributes).map(([key, value]) => (
                 <motion.div key={key} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 }}}>
                    <Attribute label={key.charAt(0).toUpperCase() + key.slice(1)} value={value} />
                 </motion.div>
              ))}
            </motion.div>
          </div>
          <div>
            <h2 className="text-3xl font-bold border-b-2 border-cyan-400 pb-2 mb-4">Description</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {data.profile.description}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/menu" className="inline-block text-xl px-6 py-3 bg-gray-800 border-2 border-gray-700 rounded-md text-white hover:bg-cyan-400 hover:text-black transition-all duration-300">
            Back to Menu
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Stats;
