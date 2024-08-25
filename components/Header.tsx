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
    // Manage mounted state to prevent SSR issues
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;  // Avoid rendering the component until it’s mounted
    }

    return (
        <header className="text-white p-4 md:p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 border-2 border-gray-600 rounded-md">
            <div className="flex items-center space-x-4 md:space-x-6">
                <img src="/wallet.jpeg" alt="Wallet Image" className="w-16 h-16 rounded-xl shadow-xl border-4 border-teal-500"/>
                <div className="flex flex-col">
                    <p className={`${bungee.className} text-2xl md:text-3xl lg:text-4xl font-extrabold text-teal-400`}>
                        BLOCKCHAIN
                    </p>
                    <p className={`${bungee.className} text-lg md:text-xl lg:text-2xl font-bold text-blue-400`}>
                        WEB BASED WALLET
                    </p>
                </div>
            </div>
            <div className="flex-shrink-0">
                <ThemeToggle />
            </div>
        </header>
    );
}
