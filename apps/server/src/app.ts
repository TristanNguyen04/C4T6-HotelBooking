import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from 'express';
import cors from "cors";
import paymentRouter from "../routers/payment";


const app: Application = express();
const PORT: number = 3000;


app.use(cors({
  origin: "http://localhost:5173", // allow Vite frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json()); // make sure body parsing works

// mount your router
app.use("/", paymentRouter);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});