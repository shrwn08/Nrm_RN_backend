import express from "express";
import {connectDb} from "./src/db/connection.js";
import userRoutes from "./src/routes/user.routes.js";
import cors from "cors";
import orderRoutes from "./src/routes/order.routes.js";
import addressRoutes from "./src/routes/address.routes.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({"origin": "*"}))

app.get("/health-check", (req, res) => {
    console.log("Route is working");
    res.status(200).json({ status: "ok" });
})
connectDb();
app.use("/api", userRoutes);
app.use("api/orders", orderRoutes);
app.use("/api/address", addressRoutes)

app.listen(PORT, "0.0.0.0",() => console.log(`Server listening on port ${PORT}`));