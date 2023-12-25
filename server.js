import "dotenv/config";

import express from "express";
const app = express();

// Middlewares
import cors from "cors";
app.use(cors());
app.use(express.json());

// dbconfig
import { dbConnect } from "./dbConfig/dbConnect.js";
dbConnect();

// APIS
import authRoute from "./ROutes/authRoute.js";
app.use("/api/v1/auth", authRoute);

// Listeing the port
const port = process.env.port || 8000;
app.listen(port, () => {
  console.log("App is listening");
});
