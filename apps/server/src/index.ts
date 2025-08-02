import dotenv from "dotenv";
dotenv.config();

import express, { type Request, type Response } from 'express';
import cors from "cors";

import paymentRoutes from "./routes/paymentRoutes";
import destinationRoutes from "./routes/destinationRoutes";
import hotelRoutes from "./routes/hotelRoutes";
import authRoutes from "./routes/authRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import dbUtilRoutes from "./routes/dbUtilRoutes";

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000'); // Use environment PORT

// Configure CORS for production and development
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL, "http://localhost:5173"]
  : ["http://localhost:5173"];

  
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('Allowed origins:', allowedOrigins);

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

import prisma , {fuzzPrisma } from './utils/prismaClient';

//_______________________________________________________________________
// Middleware to dynamically assign prisma client based on path prefix
// added this to allow any api req with /test/... to add dynamically to
// the fuzzdb, see utils/prismaClient
app.use((req, res, next) => {
  if (req.path.startsWith('/test/')) {
    req.prisma = fuzzPrisma;
  } else {
    req.prisma = prisma;
  }
  next();
});
//_______________________________________________________________________
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hotel Booking API Server');
});

app.use("/api", destinationRoutes, hotelRoutes, authRoutes, bookingRoutes, paymentRoutes, dbUtilRoutes);
app.use("/test/api", destinationRoutes, hotelRoutes, authRoutes, bookingRoutes, paymentRoutes, dbUtilRoutes);
// only start server if not in test environment (jest)
if(process.env.NODE_ENV !== 'jest'){
  app.listen(PORT, '0.0.0.0', () => { // Bind to all interfaces
      console.log(`Server is running on port ${PORT}`);
  });
}

export default app;