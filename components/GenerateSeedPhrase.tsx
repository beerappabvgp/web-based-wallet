'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { generateMnemonic } from 'bip39';
import { toast } from 'react-toastify';
import { DisplayMnemonic } from './DisplayMnemonic';
import 'react-toastify/dist/ReactToastify.css';

interface Account {
  publicKey: string;
  privateKey: string;
  path: string;
}

interface GenerateSeedPhraseProps {
  mnemonic: string[];
  setMnemonic: React.Dispatch<React.SetStateAction<string[]>>;
  setEthereumAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  setSolanaAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
}

export const GenerateSeedPhrase: React.FC<GenerateSeedPhraseProps> = ({ mnemonic, setMnemonic , setEthereumAccounts , setSolanaAccounts }) => {
  const [showSeedPhrase, setShowSeedPhrase] = useState<boolean>(false);

  const handleGenerateSeedPhrase = () => {
    try {
      setEthereumAccounts([]);
      setSolanaAccounts([]);
      const mnemonic = generateMnemonic(128);
      setMnemonic(mnemonic.split(' '));
      toast.dismiss();
    } catch (error) {
      toast.error('Failed to generate mnemonic');
    }
  };

  const handleRevealSeedPhrase = () => {
    setShowSeedPhrase(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full lg:w-full p-4 rounded-lg shadow-lg bg-gray-800">
      <h2 className="text-2xl font-bold text-white mb-4">Generate Seed Phrase</h2>
      <Button
        onClick={handleGenerateSeedPhrase}
        className="mb-4 bg-white text-blue-600 font-bold py-2 px-4 rounded-md transition-transform transform hover:scale-105 text-lg"
      >
        Generate Seed Phrase
      </Button>
      <div className="flex flex-col items-center">
        {mnemonic.length > 0 && showSeedPhrase ? (
          <DisplayMnemonic mnemonic={mnemonic} />
        ) : mnemonic.length > 0 ? (
          <Button onClick={handleRevealSeedPhrase} className="bg-white text-blue-600 font-bold py-2 px-4 rounded-md transition-transform transform hover:scale-105 text-lg">
            Reveal Seed Phrase
          </Button>
        ) : (
          <p className="text-xl text-white">Please generate a seed phrase to display</p>
        )}
      </div>
    </div>
  );
};
