import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Modal from '../components/Modal';

const InventoryItem = ({ item, onSelect }) => {
  const rarityColor = {
    Legendary: 'text-yellow-400',
    Epic: 'text-purple-500',
    Rare: 'text-blue-400',
    Uncommon: 'text-green-400',
    Common: 'text-gray-300',
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-70 border border-gray-700 rounded-lg p-4 flex flex-col items-center text-center cursor-pointer"
      whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(0, 255, 255, 0.3)' }}
      onClick={() => onSelect(item)}
      layoutId={`card-container-${item.name}`}
    >
      <img src={item.imageUrl} alt={item.name} className="w-32 h-32 object-contain mb-4" />
      <h2 className="text-xl font-bold mb-1">{item.name}</h2>
      <p className="text-md text-gray-400 mb-2">{item.type}</p>
      <p className={`text-lg font-bold ${rarityColor[item.rarity] || 'text-gray-300'}`}>{item.rarity}</p>
    </motion.div>
  );
};

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setInventory(data.inventory));
  }, []);

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center p-4">
        <motion.div
          className="bg-black bg-opacity-70 border-2 border-cyan-400 p-8 rounded-lg shadow-lg shadow-cyan-500/20 w-full max-w-6xl text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8 border-b-2 border-cyan-400 pb-4">
            Inventory
          </h1>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {inventory.map((item) => (
              <motion.div key={item.name} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}>
                <InventoryItem item={item} onSelect={setSelectedItem} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 text-center">
            <Link to="/menu" className="inline-block text-xl px-6 py-3 bg-gray-800 border-2 border-gray-700 rounded-md text-white hover:bg-cyan-400 hover:text-black transition-all duration-300">
              Back to Menu
            </Link>
          </div>
        </motion.div>
      </div>

      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
        {selectedItem && (
          <div>
            <h2 className="text-3xl font-bold mb-2">{selectedItem.name}</h2>
            <p className="text-lg text-gray-400 mb-4">{selectedItem.type}</p>
            <img src={selectedItem.imageUrl} alt={selectedItem.name} className="w-48 h-48 object-contain mb-4 mx-auto bg-gray-800 p-2 rounded-md" />
            <p className="text-xl leading-relaxed">{selectedItem.description}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Inventory;
