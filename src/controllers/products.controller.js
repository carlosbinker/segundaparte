// Listado de productos (array con objetos JSON) -- Lo mudamos ahora desde el módulo products.router.js

const products = [
  {
    id: 1,
    nombre: "queso fresco rallado",
    precio: 800,
    vencimiento: "30/11/25",
  },
  { id: 2, nombre: "queso roquefort", precio: 1200, vencimiento: "3/10/25" },
  { id: 3, nombre: "queso port salut", precio: 650, vencimiento: "16/8/25" },
  { id: 4, nombre: "queso cuartirolo", precio: 860, vencimiento: "13/9/26" },
];

// Exporto el controlador que me va a traer toods los productos desde el array ficticio que me simula por ahoera el modelo de la BD
export const getAllProducts = (req, res) => {
  res.send(products);
};
