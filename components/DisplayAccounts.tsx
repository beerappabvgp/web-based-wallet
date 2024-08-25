import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Account {
  publicKey: string;
  privateKey: string;
  path: string;
}

interface DisplayAccountsProps {
  ethereumAccounts: Account[];
  solanaAccounts: Account[];
  selectedChain: string;
}

export function DisplayAccounts({ ethereumAccounts, solanaAccounts, selectedChain }: DisplayAccountsProps) {
  const [showPrivateKey, setShowPrivateKey] = useState<boolean[]>([]);

  const handleTogglePrivateKey = (index: number) => {
    setShowPrivateKey((prev) => {
      const newShow = [...prev];
      newShow[index] = !newShow[index];
      return newShow;
    });
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy to clipboard.');
      });
  };

  const accountsToShow = selectedChain === 'Ethereum' ? ethereumAccounts : solanaAccounts;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-xl">
      {accountsToShow.map((account, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-white mb-3">Wallet {index + 1}</h3>
          <div className="mb-3 flex items-center">
            <p className="text-white break-all mb-1 flex-grow">Public Key: {account.publicKey}</p>
            <button onClick={() => handleCopyToClipboard(account.publicKey)} className="ml-2 text-blue-500 hover:text-blue-400">
              <FaCopy size={18} />
            </button>
          </div>
          <div className="mb-3 flex items-center">
            <p className="text-white break-all mb-1 flex-grow">
              Private Key: {showPrivateKey[index] ? account.privateKey : '**********'}
            </p>
            <button onClick={() => handleTogglePrivateKey(index)} className="ml-2 text-blue-500 hover:text-blue-400">
              {showPrivateKey[index] ? 'Hide' : 'Show'}
            </button>
            {showPrivateKey[index] && (
              <button onClick={() => handleCopyToClipboard(account.privateKey)} className="ml-2 text-blue-500 hover:text-blue-400">
                <FaCopy size={18} />
              </button>
            )}
          </div>
          <p className="text-gray-400 mt-2">Path: {account.path}</p>
        </div>
      ))}
    </div>
  );
}
