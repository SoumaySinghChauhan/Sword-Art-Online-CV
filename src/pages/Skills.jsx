import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setSkills(data.skills));
  }, []);

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <motion.div
        className="bg-black bg-opacity-70 border-2 border-cyan-400 p-8 rounded-lg shadow-lg shadow-cyan-500/20 w-full max-w-6xl text-white h-[80vh] flex flex-col"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-6 border-b-2 border-cyan-400 pb-4">
          Skill Tree
        </h1>

        <div className="flex-grow flex gap-8 overflow-hidden">
          {/* Skill List */}
          <motion.div
            className="w-1/3 overflow-y-auto pr-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                className={`p-4 mb-2 rounded-md cursor-pointer border-l-4 transition-all duration-200 ${selectedSkill?.name === skill.name ? 'bg-cyan-400 text-black border-cyan-200' : 'bg-gray-800 border-gray-600 hover:bg-gray-700'}`}
                onClick={() => handleSkillSelect(skill)}
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                whileHover={{ scale: 1.03 }}
              >
                <h2 className="text-xl font-bold">{skill.name}</h2>
                <p className={`text-sm ${selectedSkill?.name === skill.name ? 'text-gray-900' : 'text-gray-400'}`}>{skill.type}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Skill Details */}
          <div className="w-2/3 bg-gray-900 bg-opacity-50 p-6 rounded-lg border border-gray-700">
            <AnimatePresence mode="wait">
              {selectedSkill ? (
                <motion.div
                  key={selectedSkill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-cyan-400 mb-2">{selectedSkill.name}</h2>
                  <p className="text-lg font-bold text-yellow-400 mb-4">{selectedSkill.level}</p>
                  <p className="text-xl leading-relaxed">{selectedSkill.description}</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex items-center justify-center"
                >
                  <p className="text-2xl text-gray-500">Select a skill to view details</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/menu" className="inline-block text-xl px-6 py-3 bg-gray-800 border-2 border-gray-700 rounded-md text-white hover:bg-cyan-400 hover:text-black transition-all duration-300">
            Back to Menu
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;
