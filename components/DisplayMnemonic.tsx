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
                    toast.success("Mnemonic copied to clipboard", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .catch((err) => {
                    toast.error(`Failed to copy: ${err.message}`, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }
    };

    return (
        <motion.div 
            className="flex flex-col items-center bg-slate-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            {showCopy && (
                <Button 
                    onClick={copyToClipBoard} 
                    className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-transform transform hover:scale-105"
                >
                    <MdContentCopy className="text-xl" />
                    Copy
                </Button>
            )}
            {showCopy && (
                <motion.div 
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 shadow-lg p-4 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {mnemonic.map((word, index) => (
                        <motion.div 
                            key={index} 
                            className="text-center p-2 border-2 border-black-600 rounded-md text-xl text-white bg-slate-600"
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
