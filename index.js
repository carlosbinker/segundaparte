// Importo Express
import express from "express";
// Importo cors
import cors from "cors";
// Creo la instancia
const app = express();

// Acá va el middleware de mantenimiento (comentado cuando no está en mantenimiento)

// app.use((req, res, next) => {
//   res.json({ message: "En mantenimiento" })
// });

// Antes de la declaración de todas las rutas ponemos todos los middlewares

app.use(express.json()) // Middleware para poder ver el req.query (debe estar antes del import productsRouter)
app.use(cors()) // Middleware de cors para permitir peticiones desde otro dominio

// Agregado de una ruta de bienvenida que devuelve un JSON (tal como corresponde a una API Rest)

app.get("/", (req, res) => {
  res.json({message: "API Rest en Node.js"});
});

// Ahora acá voy a importar el router desde el módulo products.router.js, creando una instancia llamada productsRouter
import productsRouter from './src/routes/products.router.js'

// Ahora simplemente le digo a la app que utilice productsRouter (que contiene todas las rutas que se crearon previamente aquí. Ver clase 11)
app.use('/api', productsRouter);

// Middleware propio para detectar que se escibe mal el recurso al que se quiere acceder (Error handle)

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
})

// NOTA: el next se usará más adelante para indicar que sigue otro middleware, por ejemplo un login

//Escucho en el puerto 3000

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}/`);
});
