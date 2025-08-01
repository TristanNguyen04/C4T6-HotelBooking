"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const destinationRoutes_1 = __importDefault(require("./routes/destinationRoutes"));
const hotelRoutes_1 = __importDefault(require("./routes/hotelRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const dbUtilRoutes_1 = __importDefault(require("./routes/dbUtilRoutes"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000');
const allowedOrigins = process.env.FRONTEND_URL
    ? [process.env.FRONTEND_URL, "http://localhost:5173"]
    : ["http://localhost:5173"];
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('Allowed origins:', allowedOrigins);
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));
app.use(express_1.default.json());
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
app.get('/', (req, res) => {
    res.send('Hotel Booking API Server');
});
app.use("/api", destinationRoutes_1.default, hotelRoutes_1.default, authRoutes_1.default, bookingRoutes_1.default, paymentRoutes_1.default, dbUtilRoutes_1.default);
if (process.env.NODE_ENV !== 'jest') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
exports.default = app;
