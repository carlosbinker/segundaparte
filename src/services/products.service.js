// Listado de productos (array con objetos JSON) -- Lo mudamos ahora desde el módulo products.controllers.js. Simularemos por ahora que hay un servicio que le brindará los datos a los controladores.

const products = [
  {
    id: 1,
    nombre: "queso fresco",
    precio: 800,
    vencimiento: "30/11/25",
  },
  { id: 2, nombre: "queso roquefort", precio: 1200, vencimiento: "3/10/25" },
  { id: 3, nombre: "queso port salut", precio: 650, vencimiento: "16/8/25" },
  { id: 4, nombre: "queso gruyere", precio: 860, vencimiento: "13/9/26" },
  { id: 5, nombre: "queso provolone", precio: 975, vencimiento: "13/9/26" }
];

export const getAllProducts = () => { return products };
