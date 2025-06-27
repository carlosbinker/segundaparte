// Importo Express
import express from "express";
// Creo la instancia
const app = express();

// Agregado de una ruta de bienvenida que devuelve un HTML

app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a la API REST</h1>");
});

// Agregado de una ruta que devuelve un JSON

const products = [
  { id: 1, nombre: "queso fresco", precio: 800, vencimiento: "30/11/25" },
  { id: 2, nombre: "queso roquefort", precio: 1200, vencimiento: "3/10/25" },
  { id: 3, nombre: "queso port salut", precio: 650, vencimiento: "16/8/25" },
  { id: 4, nombre: "queso cuartirolo", precio: 860, vencimiento: "13/9/26" },
];

app.get("/products", (req, res) => {
  res.json(products);
});



//Escucho en el puerto 3000

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}/`);
});
