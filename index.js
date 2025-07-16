// Leo primero que nada las variables de entorno.
import "dotenv/config";
// Importo Express
import express from "express";
// Importo cors
import cors from "cors";
// Creo la instancia de la aplicación que sólo vivirá en este módulo, el ámbito de validez de app será en index.js, puede haber otra instancia que se llame app en otro archivo y no se pisarían!
const app = express();

// app.use(bodyParser.json()); NO hace falta agregar esto porque ya se utiliza express.json() y viene ya nativo en node.js

// Acá iría middleware de mantenimiento (comentado cuando no está en mantenimiento), de lo contrario ante cualquier petición es lo primero que se ejecuta siempre y no avanza de acá!

// app.use((req, res, next) => {
//   res.json({ message: "En mantenimiento" })
// });

// Ahora acá voy a importar el router desde el módulo products.router.js, creando una instancia llamada productsRouter
import productsRouter from "./src/routes/products.router.js";
// Importo el router desde el módulo auth.controller.js, creando una instancia llamada authrouter
import authRouter from './src/routes/auth.router.js';

// Antes de la declaración de todas las rutas ponemos todos los middlewares

app.use(express.json()); // Middleware para poder ver el req.query (debe estar antes del import productsRouter)
app.use(cors()); // Middleware de cors para permitir peticiones desde otro dominio
app.use("/auth", authRouter);
app.use("/api", productsRouter);

// Routers 
// Agregado de una ruta de bienvenida que devuelve un JSON (tal como corresponde a una API Rest)

app.get("/", (req, res) => {
  res.json({ message: "API Rest en Node.js" });
});

// Middleware propio para detectar que se escibe mal el recurso al que se quiere acceder (Error handle)

app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

//Escucho en el puerto 3000

const PORT = process.env.PORT || 3001;
// console.log(process.env)

app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}/`);
});
