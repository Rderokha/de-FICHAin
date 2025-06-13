
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const now = new Date();// prisma/seed.ts
async function main() {
  const bets = [
      // ~9 apuestas en categoría "social"~
      {
        title: "¿Se aprobará la ley de vivienda asequible en 2025?",
        description: "Iniciativa social en discusión en el congreso",
        options: ["Sí", "No"],
        status: "OPEN",
        category: "social",
        creatorAddress: "0xaaaa000000000000000000000000000000000000",
        createdAt: now,
      },
      {
        title: "¿Alcanzará Santiago un transporte público 100% eléctrico este año?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "social",
        creatorAddress: "0xaaaa000000000000000000000000000000000001",
        createdAt: now,
      },
      {
        title: "¿Se duplicará el número de bibliotecas comunitarias en 2025?",
        description: "Meta del ministerio de cultura",
        options: ["Sí", "No"],
        status: "OPEN",
        category: "social",
        creatorAddress: "0xaaaa000000000000000000000000000000000002",
        createdAt: now,
      },
      {
        title: "¿Se reduce la tasa de pobreza en Chile en más de 2 puntos de aquí a diciembre?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "social",
        creatorAddress: "0xaaaa000000000000000000000000000000000003",
        createdAt: now,
      },
      {
        title: "¿Implementarán 100% de colegios rurales con Internet gratuito este año?",
        description: "Plan del ministerio de educación",
        options: ["Sí", "No"],
        status: "OPEN",
        category: "social",
        creatorAddress: "0xaaaa000000000000000000000000000000000004",
        createdAt: now,
      },
      {
        title: "¿Habrá aumento del salario mínimo en un 10% este semestre?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "social",
        creatorAddress: "0xaaaa000000000000000000000000000000000005",
        createdAt: now,
      },
      {
        title: "¿Será aprobado un subsidio para cuidados de adultos mayores antes de fin de año?",
        description: "Propuesta en discusión parlamentaria",
        options: ["Sí", "No"],
        status: "OPEN",
        category: "social",
        creatorAddress: "0xaaaa000000000000000000000000000000000006",
        createdAt: now,
      },
      {
        title: "¿Se reducirá el tiempo promedio de espera en hospitales públicos en 2025?",
        description: "Meta de salud pública",
        options: ["Sí", "No"],
        status: "OPEN",
        category: "social",
        creatorAddress: "0xaaaa000000000000000000000000000000000007",
        createdAt: now,
      },
      {
        title: "¿Aumentará la tasa de vacunación contra influenza este año?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "social",
        creatorAddress: "0xaaaa000000000000000000000000000000000008",
        createdAt: now,
      },

      // ~9 apuestas en categoría "política"~
      {
        title: "¿Ganará el partido X las elecciones municipales de octubre 2025?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "política",
        creatorAddress: "0xbbbb000000000000000000000000000000000000",
        createdAt: now,
      },
      {
        title: "¿Se aprobará la reforma tributaria en el Senado antes de fin de año?",
        description: "Discusión pendiente en comisión",
        options: ["Sí", "No"],
        status: "OPEN",
        category: "política",
        creatorAddress: "0xbbbb000000000000000000000000000000000001",
        createdAt: now,
      },
      {
        title: "¿Chile firmará el nuevo tratado comercial con la UE este semestre?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "política",
        creatorAddress: "0xbbbb000000000000000000000000000000000002",
        createdAt: now,
      },
      {
        title: "¿Se aplazará el plebiscito constituyente a 2026?",
        description: "Debate en curso",
        options: ["Sí", "No"],
        status: "OPEN",
        category: "política",
        creatorAddress: "0xbbbb000000000000000000000000000000000003",
        createdAt: now,
      },
      {
        title: "¿Habrá cambio de gabinete antes de julio 2025?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "política",
        creatorAddress: "0xbbbb000000000000000000000000000000000004",
        createdAt: now,
      },
      {
        title: "¿Se eliminará el voto voluntario antes de 2026?",
        description: "Propuesta legislativa",
        options: ["Sí", "No"],
        status: "OPEN",
        category: "política",
        creatorAddress: "0xbbbb000000000000000000000000000000000005",
        createdAt: now,
      },
      {
        title: "¿Se implementará registro digital único de beneficiarios en 2025?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "política",
        creatorAddress: "0xbbbb000000000000000000000000000000000006",
        createdAt: now,
      },
      {
        title: "¿Habrá reforma al sistema binominal antes de 2027?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "política",
        creatorAddress: "0xbbbb000000000000000000000000000000000007",
        createdAt: now,
      },
      {
        title: "¿Se aprobará ley de transparencia financiera en campaña en 2025?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "política",
        creatorAddress: "0xbbbb000000000000000000000000000000000008",
        createdAt: now,
      },

      // ~9 apuestas en categoría "economía"~
      {
        title: "¿El PIB crecerá más del 3% en 2025?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "economía",
        creatorAddress: "0xcccc000000000000000000000000000000000000",
        createdAt: now,
      },
      {
        title: "¿Se mantendrá la tasa de inflación por debajo del 5% a fin de año?",
        description: "Según el banco central",
        options: ["Sí", "No"],
        status: "OPEN",
        category: "economía",
        creatorAddress: "0xcccc000000000000000000000000000000000001",
        createdAt: now,
      },
      {
        title: "¿El dólar bajará de $800 CLP antes de agosto?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "economía",
        creatorAddress: "0xcccc000000000000000000000000000000000002",
        createdAt: now,
      },
      {
        title: "¿El precio del cobre llegará a $4,500 USD por tonelada este semestre?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "economía",
        creatorAddress: "0xcccc000000000000000000000000000000000003",
        createdAt: now,
      },
      {
        title: "¿La tasa de desempleo caerá por debajo del 7% en 2025?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "economía",
        creatorAddress: "0xcccc000000000000000000000000000000000004",
        createdAt: now,
      },
      {
        title: "¿Se firmará un nuevo acuerdo de inversión con China en 2025?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "economía",
        creatorAddress: "0xcccc000000000000000000000000000000000005",
        createdAt: now,
      },
      {
        title: "¿El precio de la luz bajará más del 10% este año?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "economía",
        creatorAddress: "0xcccc000000000000000000000000000000000006",
        createdAt: now,
      },
      {
        title: "¿Se reducirá la deuda externa a menos del 40% del PIB antes de 2026?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "economía",
        creatorAddress: "0xcccc000000000000000000000000000000000007",
        createdAt: now,
      },
      {
        title: "¿Se estabilizará el tipo de cambio en +/- 2% mensual este semestre?",
        description: null,
        options: ["Sí", "No"],
        status: "OPEN",
        category: "economía",
        creatorAddress: "0xcccc000000000000000000000000000000000008",
        createdAt: now,
      },
    ];
    await prisma.bet.createMany({
    data: bets
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });