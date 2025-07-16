import { Router } from 'express';

// Creo una instancia de Router
const router = Router();

// Acá vamos a traernos todas las rutas con sus métodos (esquema CRUD) que teníamos en index.js, y vamos a reemplazar app por router
// Después voy a importar todos los controladores desde products.controller.js (tiene que ser obligatorio ahora una importación nombrada)

import {getAllProducts, searchProducts, getProductById , addNewProduct, updateProductById, deleteProductById} from '../controllers/products.controller.js';

// Primera ruta con GET trayendo todos los productos
router.get("/products", getAllProducts);
  
// Segunda ruta con GET pero ahora empleando query string -- se cambió el orden, antes se había puesto como tercera opción.
  
router.get("/products/search", searchProducts);
  
// Tercera ruta con GET pero usando params (la idea es traer el producto indicado por el idproduct, ejemplo /products/2)
  
router.get("/products/:id", getProductById);
  
// Cuarta ruta con POST
  
router.post("/products", addNewProduct);
  
// Quinta ruta ahora con método PUT
  
router.put("/products/:id", updateProductById);
  
// Sexta ruta con DELETE
  
router.delete("/products/:id", deleteProductById);

// Exporto router por default para que en otro módulo se pueda cambiar el nombre (a diferencia de lo que sería una exportación nombrada)
// Ejemplo de exportación nombrada const Hola = () => {}

export default router;