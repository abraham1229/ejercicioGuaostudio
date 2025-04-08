import express from 'express' //ESM (es la nueva version que sustituye require)
import cors from 'cors'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'

connectDB()

const app = express(); // Instancia del servidor

//Cors
app.use(cors(corsConfig))

//Leer datos de formularios (es middleware global)
app.use(express.json())


app.use('/',router) // Se toma desde /, lo que mapea cada peticion


export default app