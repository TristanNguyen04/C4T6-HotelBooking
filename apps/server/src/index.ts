import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from 'express';
import cors from "cors";

import paymentRoutes from "./routes/paymentRoutes";
import destinationRoutes from "./routes/destinationRoutes";
import hotelRoutes from "./routes/hotelRoutes";
import authRoutes from "./routes/authRoutes";
import bookingRoutes from "./routes/bookingRoutes";

const app: Application = express();
const PORT: number = 3000;

app.use(cors({
  origin: "http://localhost:5173", // allow Vite frontend
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

app.use(express.json()); // make sure body parsing works

// mount your router
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
});
app.use("/api", destinationRoutes, hotelRoutes, authRoutes, bookingRoutes, paymentRoutes);

// only start server if not in test environment (jest)
if(process.env.NODE_ENV !== 'test'){
  app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;