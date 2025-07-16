import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import betRoutes from "./routes/bets";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/bets", betRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
