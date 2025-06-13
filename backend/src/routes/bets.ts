import express from "express";
import prisma from "../prisma";
import { verifySIWE } from "../auth/verifySIWE";
import { Prisma } from "@prisma/client";

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

router.get("/accepted", async (req, res) => {
  try {
    const bets = await prisma.bet.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(bets);
  } catch (error) {
    console.error("Error fetching bets:", error);
    res.status(500).json({ error: "Failed to fetch bets" });
  }
});
router.get("/proposed", async (req, res) => {
  try {
    const bets = await prisma.proposedBet.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(bets);
  } catch (error) {
    console.error("Error fetching bets:", error);
    res.status(500).json({ error: "Failed to fetch bets" });
  }
});
router.get("/accept/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    // 1. Buscar el ProposedBet
    const proposedBet = await prisma.proposedBet.findUnique({ where: { id } });

    if (!proposedBet) {
      return res.status(404).json({ error: "Proposed bet not found" });
    }

    if (proposedBet.status !== "pending") {
      return res.status(400).json({ error: `Proposed bet is already ${proposedBet.status}` });
    }

    // 2. Actualizar el status del ProposedBet a "accepted"
    await prisma.proposedBet.update({
      where: { id },
      data: { status: "accepted" },
    });

    // 3. Crear un nuevo Bet con los datos del ProposedBet
    const bet = await prisma.bet.create({
      data: {
        title: proposedBet.title,
        description: proposedBet.description,
        options: proposedBet.options as Prisma.InputJsonValue,
        creatorAddress: proposedBet.creatorAddress,
        status: "open",
      },
    });

    // 4. Retornar el nuevo Bet
    res.json(bet);
  } catch (error) {
    console.error("Error accepting proposed bet:", error);
    res.status(500).json({ error: "Failed to accept proposed bet" });
  }
});
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10); // convertir string a número

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const deletedBet = await prisma.bet.delete({
      where: { id },
    });

    res.json({ message: "Bet deleted", bet: deletedBet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete bet" });
  }
});

router.post("/propose", async (req, res) => {
  const { message, signature, title, description, options } = req.body;

  const address = await verifySIWE(message, signature);
  if (!address) return res.status(401).json({ error: "Unauthorized" });

  if (!title || !options || options.length < 2) {
    return res.status(400).json({ error: "Invalid proposed bet data" });
  }

  const proposedBet = await prisma.proposedBet.create({
    data: {
      title,
      description,
      options,
      creatorAddress: address,
    },
  });

  res.json(proposedBet);
});


export default router;