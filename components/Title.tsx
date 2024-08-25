import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Title = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <motion.h1
                className="text-5xl font-extrabold mb-4 text-center relative "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Create Your Wallets in Seconds on Blockchain
            </motion.h1>
            <motion.div
                className="text-6xl font-semibold relative"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <DynamicText />
            </motion.div>
        </div>
    );
};

// DynamicText component to animate swapping blockchain names
const blockchainNames = ['Solana', 'Ethereum', 'Bitcoin'];

const DynamicText = () => {
    const [currentName, setCurrentName] = useState(blockchainNames[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentName((prevName) => {
                const currentIndex = blockchainNames.indexOf(prevName);
                const nextIndex = (currentIndex + 1) % blockchainNames.length;
                return blockchainNames[nextIndex];
            });
        }, 2000); // Change text every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.span
            className="text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {currentName}
        </motion.span>
    );
};
