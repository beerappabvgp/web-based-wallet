import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';

interface DisplayMnemonicProps {
    mnemonic: string[];
}

export const DisplayMnemonic: React.FC<DisplayMnemonicProps> = ({ mnemonic }) => {
    const [showCopy, setShowCopy] = useState<boolean>(false);

    useEffect(() => {
        setShowCopy(mnemonic && mnemonic.length > 0);
    }, [mnemonic]);

    const copyToClipBoard = () => {
        if (mnemonic.length > 0) {
            const mnemonicString = mnemonic.join(" ");
            navigator.clipboard.writeText(mnemonicString)
                .then(() => {
                    toast.success("Mnemonic copied to clipboard");
                })
                .catch((err) => {
                    toast.error(`Failed to copy: ${err.message}`);
                });
        }
    };

    return (
        <motion.div 
            className="flex flex-col items-center p-6 rounded-lg shadow-lg w-full border-2 border-gray-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            {showCopy && (
                <Button 
                    onClick={copyToClipBoard} 
                    className="mb-4 font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-transform transform hover:scale-105"
                >
                    <MdContentCopy className="text-xl" />
                    Copy
                </Button>
            )}
            {showCopy && (
                <motion.div 
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 shadow-lg p-4 rounded-lg w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {mnemonic.map((word, index) => (
                        <motion.div 
                            key={index} 
                            className="text-center p-2 border-2 rounded-md text-xl"
                            whileHover={{ scale: 1.1 }}
                        >
                            {word}
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};
