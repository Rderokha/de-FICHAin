"use client";

import { useAccount, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { useCallback } from "react";
import { proposeBet } from "../utils/api";


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
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Proponer apuesta
    </button>
  );
}

export default ProposeBetButton;