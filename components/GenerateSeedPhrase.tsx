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

export const GenerateSeedPhrase: React.FC<GenerateSeedPhraseProps> = ({
  mnemonic,
  setMnemonic,
  setEthereumAccounts,
  setSolanaAccounts,
}) => {
  const [showSeedPhrase, setShowSeedPhrase] = useState<boolean>(false);

  const handleGenerateSeedPhrase = () => {
    try {
      setEthereumAccounts([]);
      setSolanaAccounts([]);
      const mnemonic = generateMnemonic(128);
      setMnemonic(mnemonic.split(' '));
      setShowSeedPhrase(false);
      toast.dismiss();
    } catch (error) {
      toast.error('Failed to generate mnemonic');
    }
  };

  const handleRevealSeedPhrase = () => {
    setShowSeedPhrase(true);
  };

  const handleCloseSeedPhrase = () => {
    setShowSeedPhrase(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full lg:w-full p-4 rounded-lg shadow-lg border-2 border-gray-600">
      
      <Button
        onClick={handleGenerateSeedPhrase}
        className="mb-4 font-bold py-2 px-4 rounded-md transition-transform transform hover:scale-105 text-lg border-2"
      >
        Generate Seed Phrase
      </Button>
      <div className="flex flex-col items-center">
        {mnemonic.length > 0 && showSeedPhrase ? (
          <>
            <DisplayMnemonic mnemonic={mnemonic} />
            <Button onClick={handleCloseSeedPhrase} className="mt-4 font-bold py-2 px-4 rounded-md transition-transform transform hover:scale-105 text-lg">
              Close Seed Phrase
            </Button>
          </>
        ) : mnemonic.length > 0 ? (
          <Button onClick={handleRevealSeedPhrase} className="font-bold py-2 px-4 rounded-md transition-transform transform hover:scale-105 text-lg">
            Reveal Seed Phrase
          </Button>
        ) : (
          <p className="text-xl">Please generate a seed phrase to display</p>
        )}
      </div>
    </div>
  );
};
