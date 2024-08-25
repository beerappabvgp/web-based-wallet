import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { derivePath } from 'ed25519-hd-key';
import * as bs58 from 'bs58';
import { toast } from 'react-toastify';
import { mnemonicToSeedSync } from 'bip39';
import { Keypair } from '@solana/web3.js';
import { ethers } from 'ethers';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Account {
  publicKey: string;
  privateKey: string;
  path: string;
}

interface BlockchainDropdownProps {
  mnemonic: string[];
  ethereumAccounts: Account[];
  setEthereumAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  solanaAccounts: Account[];
  setSolanaAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  selectedChain: string;
  setSelectedChain: React.Dispatch<React.SetStateAction<string>>;
}

export function BlockchainDropdown({
  mnemonic,
  ethereumAccounts,
  setEthereumAccounts,
  solanaAccounts,
  setSolanaAccounts,
  selectedChain,
  setSelectedChain,
}: BlockchainDropdownProps) {
  const handleAddAccount = () => {
    if (!mnemonic.length) {
      toast.error('Please generate a seed phrase first.');
      return;
    }

    const seedBuffer = mnemonicToSeedSync(mnemonic.join(' '));
    const pathType = selectedChain === 'Ethereum' ? '60' : '501';
    const accountIndex = selectedChain === 'Ethereum' ? ethereumAccounts.length : solanaAccounts.length;
    const path = `m/44'/${pathType}'/0'/${accountIndex}'`;

    try {
      const keys = derivePath(path, seedBuffer.toString('hex'));
      let publicKeyEncoded: string;
      let privateKeyEncoded: string;

      if (selectedChain === 'Solana') {
        const keypair = Keypair.fromSeed(keys.key);
        privateKeyEncoded = bs58.default.encode(keypair.secretKey);
        publicKeyEncoded = keypair.publicKey.toBase58();
        setSolanaAccounts((prevAccounts) => [
          ...prevAccounts,
          { publicKey: publicKeyEncoded, privateKey: privateKeyEncoded, path },
        ]);
      } else if (selectedChain === 'Ethereum') {
        const wallet = new ethers.Wallet(keys.key.toString('hex'));
        privateKeyEncoded = keys.key.toString('hex');
        publicKeyEncoded = wallet.address;
        setEthereumAccounts((prevAccounts) => [
          ...prevAccounts,
          { publicKey: publicKeyEncoded, privateKey: privateKeyEncoded, path },
        ]);
      }
    } catch (error) {
      console.error('Error adding account:', error);
      toast.error('Failed to add account. Please try again.');
    }
  };

  const handleSelect = (chain: string) => {
    setSelectedChain(chain);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 rounded-lg shadow-lg bg-gray-800">
      <h2 className="text-2xl font-bold text-white mb-4">Add Blockchain Account</h2>
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-lg py-2 px-4 bg-white text-blue-600 font-bold rounded-md transition-transform transform hover:scale-105">
              {selectedChain}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 text-lg flex flex-col font-bold">
            <DropdownMenuLabel className="text-center text-blue-600">SELECT CHAIN</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleSelect('Ethereum')} className="hover:bg-blue-600 hover:text-white">
                Ethereum
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSelect('Solana')} className="hover:bg-blue-600 hover:text-white">
                Solana
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          onClick={handleAddAccount}
          className="text-lg py-2 px-4 bg-blue-600 text-white font-bold rounded-md transition-transform transform hover:scale-105"
          disabled={selectedChain === 'Select Blockchain'}
        >
          {`Create ${selectedChain} Wallet`}
        </Button>
      </div>
    </div>
  );
}
