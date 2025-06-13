import express from "express";
import prisma from "../prisma";
import { verifySIWE } from "../auth/verifySIWE";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { message, signature, title, description, options } = req.body;

  const address = await verifySIWE(message, signature);
  if (!address) return res.status(401).json({ error: "Unauthorized" });

  if (!title || !options || options.length < 2) {
    return res.status(400).json({ error: "Invalid bet data" });
  }

  const bet = await prisma.bet.create({
    data: {
      title,
      description,
      options,
      creatorAddress: address,
      status: "open",
    },
  });

  res.json(bet);
});

export default router;