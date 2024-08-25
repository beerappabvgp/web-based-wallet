import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

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

  const accountsToShow = selectedChain === 'Ethereum' ? ethereumAccounts : solanaAccounts;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 text-xl">
      {accountsToShow.map((account, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <p className="text-white break-all mb-3">Public Key: {account.publicKey}</p>
          <p className="text-white break-all mb-3">
            Private Key: {showPrivateKey[index] ? account.privateKey : '**********'}
          </p>
          <Button variant="outline" onClick={() => handleTogglePrivateKey(index)} className="mt-2 bg-blue-600 hover:bg-blue-700">
            {showPrivateKey[index] ? 'Hide' : 'Show'} Private Key
          </Button>
          <p className="text-gray-400 mt-2">Path: {account.path}</p>
        </div>
      ))}
    </div>
  );
}
