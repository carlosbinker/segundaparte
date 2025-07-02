import { Router } from 'express';

// Desestructuro el módulo Router desde express para el manejo de las rutas
export { Router } from 'express';

// Creo una instancia de Router
const router = Router();

// Listado de productos (array con objetos JSON) -- Lo mudamos ahora desde el módulo products.router.js

// const products = [
//     {
//       id: 1,
//       nombre: "queso fresco rallado",
//       precio: 800,
//       vencimiento: "30/11/25",
//     },
//     { id: 2, nombre: "queso roquefort", precio: 1200, vencimiento: "3/10/25" },
//     { id: 3, nombre: "queso port salut", precio: 650, vencimiento: "16/8/25" },
//     { id: 4, nombre: "queso cuartirolo", precio: 860, vencimiento: "13/9/26" },
//   ];

// Acá vamos a traernos todas las rutas con sus métodos (esquema CRUD) que teníamos en index.js, y vamos a reemplazar app por router

// Ahora voy a importar el controlador desde products.controller.js (tiene que ser obligatorio ahora una importación nombrada)

import { getAllProducts, searchProducts, getProductById , addNewProduct, updateProductById, deleteProductById} from '../controllers/products.controller.js';

// Primera ruta con GET trayendo todos los productos
router.get("/products", getAllProducts);
  
// Segunda ruta con GET pero ahora empleando query string -- se cambió el orden, antes se había puesto como tercera opción.
  
// El Query String (o cadena de consulta en español) es una parte fundamental de una URL (Uniform Resource Locator) que se utiliza para enviar información adicional del cliente al servidor web. Es un mecanismo estándar en el protocolo HTTP para pasar datos a través de la URL, cuando se usa el método GET.
  
// Un Query String siempre comienza con un signo de interrogación (?) y se adjunta al final de la ruta de la URL. Después del ?, los datos se organizan en pares clave-valor, separados por el signo igual (=). Si hay múltiples pares clave-valor, se separan entre sí con el signo ampersand (&).
  
router.get("/products/search", searchProducts);
  
  // Tercera ruta con GET pero usando params (la idea es traer el producto indicado por el idproduct, ejemplo /products/2)
  
  router.get("/products/:idproduct", getProductById);
  
  // Cuarta ruta con POST
  
  router.post("/products", addNewProduct);
  
  // Quinta ruta ahora con método PUT
  
  router.put("/products/:id", updateProductById);
  
  // Sexta ruta con DELETE
  
router.delete("/products/:id", deleteProductById);

// Exporto router por default para que en otro módulo se pueda cambiar el nombre (a diferencia de lo que sería una exportación nombrada)
// Ejemplo de exportación nombrada const Hola = () => {}
export default router;

