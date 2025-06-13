"use client";

import { useAccount, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { useCallback } from "react";
import { proposeBet } from "../utils/api";

import { REM } from 'next/font/google';
const rem = REM({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

function ProposeBetButton() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleProposeBet = useCallback(async () => {
    if (!address) {
      alert("Connect your wallet first.");
      return;
    }

    const nonce = Math.random().toString(36).substring(2, 10); // ✅ 8+ chars

    const siweMessage = new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in to propose a bet",
      uri: window.location.origin,
      version: "1",
      chainId: 1,
      nonce,
      issuedAt: new Date().toISOString(),
    });

    const message = siweMessage.prepareMessage();

    try {
      const signature = await signMessageAsync({ message });

      const proposed = await proposeBet({
        message,
        signature,
        title: "Will Team A win the championship?",
        description: "Championship final match outcome",
        options: ["Yes", "No"],
      });
      alert("Proposed bet submitted! ID: " + proposed.id);

    } catch (err) {
      if (err instanceof Error) {
        alert("❌ Error: " + err.message);
      } else {
        alert("Unknown error occurred");
      }
    }
  }, [address, signMessageAsync]);

  return (
    <button
      onClick={handleProposeBet}
      className={`${rem.className} cursor-pointer py-4 px-10 rounded-full leading-none font-black text-2xl text-[#2F7068] bg-[#FFFFFF] transition-shadow duration-300 hover:shadow-[0_0_20px_10px_rgba(255,174,74,0.5)]`}
    >
      PROPONER<br/>APUESTA
    </button>
  );
}

export default ProposeBetButton;