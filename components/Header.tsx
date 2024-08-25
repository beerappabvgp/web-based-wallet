"use client";

import { Button } from "@/components/ui/button"; // Ensure this is needed, otherwise, remove
import '../app/globals.css'
import { Roboto, Bungee } from 'next/font/google';
import { ThemeToggle } from "./ThemeToggle";
import { useEffect, useState } from "react";

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
});

const bungee = Bungee({
    subsets: ['latin'],
    weight: ['400'],
});

export const Header = () => {
    const [mounted , setMounted] = useState(false);
        useEffect(() => {
        setMounted(true);
    } , [])
    if (!mounted) {
        return null;
    }
    return (
        <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 md:p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 md:space-x-6">
                <img src="/wallet.jpeg" alt="Wallet Image" className="w-16 h-16 rounded-xl shadow-xl border-4 border-teal-500"/>
                <div className="flex flex-col">
                    <p className={`${bungee.className} text-2xl md:text-3xl lg:text-4xl font-extrabold text-teal-400`}>
                        BLOCKCHAIN
                    </p>
                    <p className={`${bungee.className} text-lg md:text-xl lg:text-2xl font-bold text-blue-400`}>
                        WEB BASED WALLETS
                    </p>
                </div>
            </div>
            <Button className={`${roboto.className} py-2 px-4 md:py-3 md:px-6 rounded-lg text-4xl md:text-lg font-semibold bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 shadow-lg transition-all duration-300`}>
                WALLET GENERATOR 
            </Button>
            <div className="flex-shrink-0">
                <ThemeToggle />
            </div>
        </header>
    );
}
