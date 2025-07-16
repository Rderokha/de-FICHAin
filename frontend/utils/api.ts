export async function proposeBet(data: {
  message: string;
  signature: string;
  title: string;
  description: string;
  category: string;
  options: string[];
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bets/propose`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to propose bet");
  return res.json();
}
export async function createBet(betData: {
  message: string;
  signature: string;
  title: string;
  description?: string;
  options: string[];
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bets/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(betData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create bet");
  }

  return response.json();
}
export async function fetchBets() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bets/accepted`);
  if (!response.ok) throw new Error("Failed to fetch bets");
  return response.json();
}