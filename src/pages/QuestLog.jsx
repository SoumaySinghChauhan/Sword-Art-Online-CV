import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const QuestLog = () => {
  const [quests, setQuests] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setQuests(data.questLog);
        // Select the first quest by default
        if (data.questLog.length > 0) {
          setSelectedQuest(data.questLog[0]);
        }
      });
  }, []);

  const statusColor = {
    Completed: 'text-green-400',
    'In Progress': 'text-yellow-400',
    Failed: 'text-red-500',
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
          Quest Log
        </h1>

        <div className="flex-grow flex gap-8 overflow-hidden">
          {/* Quest List */}
          <motion.div
            className="w-1/3 overflow-y-auto pr-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
          >
            {quests.map((quest) => (
              <motion.div
                key={quest.title}
                className={`p-4 mb-2 rounded-md cursor-pointer border-l-4 ${selectedQuest?.title === quest.title ? 'bg-cyan-400 text-black border-cyan-200' : 'bg-gray-800 border-gray-600 hover:bg-gray-700'}`}
                onClick={() => setSelectedQuest(quest)}
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                whileHover={{ scale: 1.03 }}
              >
                <h2 className="text-lg font-bold">{quest.title}</h2>
              </motion.div>
            ))}
          </motion.div>

          {/* Quest Details */}
          <div className="w-2/3 bg-gray-900 bg-opacity-50 p-6 rounded-lg border border-gray-700">
            <AnimatePresence mode="wait">
              {selectedQuest && (
                <motion.div
                  key={selectedQuest.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-cyan-400 mb-2">{selectedQuest.title}</h2>
                  <p className={`text-xl font-bold mb-4 ${statusColor[selectedQuest.status] || 'text-gray-300'}`}>
                    Status: {selectedQuest.status}
                  </p>
                  <p className="text-xl leading-relaxed">{selectedQuest.description}</p>
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

export default QuestLog;
