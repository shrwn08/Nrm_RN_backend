import express from "express";
import {connectDb} from "./src/db/connection.js";
import userRoutes from "./src/routes/user.routes.js";
import cors from "cors";
import orderRoutes from "./src/routes/order.routes.js";
import pincodeRoutes  from "./src/routes/pincode.routes.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({"origin": "*"}))

app.get("/health-check", (req, res) => {
    console.log("Route is working");
})
connectDb();

app.use("/api", userRoutes);
app.use("api/order", orderRoutes);
app.use("/api/pincode", pincodeRoutes)

app.listen(PORT, "0.0.0.0",() => console.log(`Server listening on port ${PORT}`));