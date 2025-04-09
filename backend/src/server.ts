import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./router";
import { connectDB } from "./config/db";
import { corsConfig } from "./config/cors";

if (process.env.NODE_ENV !== "test") {
  connectDB();
}

// Instancia del servidor
const app = express(); 

//Cors
app.use(cors(corsConfig));

//Leer datos de formularios (es middleware global)
app.use(express.json());

//Iniciar ruta
app.use("/api", router);

export default app;
