import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from 'express';
import cors from "cors";

import paymentRoutes from "./routes/paymentRoutes";
import destinationRoutes from "./routes/destinationRoutes";

const app: Application = express();
const PORT: number = 3000;


app.use(cors({
  origin: "http://localhost:5173", // allow Vite frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json()); // make sure body parsing works

// mount your router
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
});
app.use("/payment", paymentRoutes);
app.use("/api", destinationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});