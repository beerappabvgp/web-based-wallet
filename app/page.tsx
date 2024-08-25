'use client';

import { DisplayAccounts } from '@/components/DisplayAccounts';
import { BlockchainDropdown } from '@/components/DropdownChain';
import { GenerateSeedPhrase } from '@/components/GenerateSeedPhrase';
import { Title } from '@/components/Title';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

interface Account {
  publicKey: string;
  privateKey: string;
  path: string;
}

export default function Home() {
  const [ethereumAccounts, setEthereumAccounts] = useState<Account[]>([]);
  const [solanaAccounts, setSolanaAccounts] = useState<Account[]>([]);
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [selectedChain, setSelectedChain] = useState<string>('Select Blockchain');

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-4 mt-4">
        <Title />
        <GenerateSeedPhrase 
        mnemonic={mnemonic} 
        setMnemonic={setMnemonic} 
        setEthereumAccounts = {setEthereumAccounts}
        setSolanaAccounts = {setSolanaAccounts}
        />
        <BlockchainDropdown
          ethereumAccounts={ethereumAccounts}
          setEthereumAccounts={setEthereumAccounts}
          solanaAccounts={solanaAccounts}
          setSolanaAccounts={setSolanaAccounts}
          mnemonic={mnemonic}
          selectedChain={selectedChain}
          setSelectedChain={setSelectedChain}
        />
      </div>
      <DisplayAccounts
        ethereumAccounts={ethereumAccounts}
        solanaAccounts={solanaAccounts}
        selectedChain={selectedChain}
      />
    </>
  );
}
