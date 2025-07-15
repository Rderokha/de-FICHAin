import { SiweMessage } from "siwe";

export async function verifySIWE(message: string, signature: string): Promise<string | null> {
  try {
    const siwe = new SiweMessage(message);
    const result = await siwe.verify({
      signature,
      domain: process.env.FRONTEND_URL,
    });

    console.log("🔍 SIWE Verification Result:", result);

    return result.success ? siwe.address : null;
  } catch (e) {
    console.error("❌ SIWE verification error:", e);
    return null;
  }
}