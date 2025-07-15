import { SiweMessage } from "siwe";

export async function verifySIWE(message: string, signature: string): Promise<string | null> {
  try {
    const siwe = new SiweMessage(message); // ✅ No uses JSON.parse

    const result = await siwe.verify({
      signature,
      domain: process.env.SIWE_DOMAIN || "localhost:3000", // Asegurate de que coincida con el frontend
    });

    return result.success ? siwe.address : null;
  } catch (e) {
    console.error("SIWE verification error:", e);
    return null;
  }
}