//Ejemplo típico de un pasamanos, acá vemos que el servivio no hace nada en realidad
import * as service from '../models/products.model.js';

// Métodos GET
export const getAllProducts = () => {return service.getAllProducts()};

export const searchProducts = (nombre) => {return service.searchProducts(nombre)};

export const getProductById = (id) => {return service.getProductById(id)};

// Método POST
export const addNewProduct = (data) => {return service.addNewProduct(data)};

// Método PUT

export const updateProductById = (productId, data) => {return service.updateProductById(productId, data)};

// Método DELETE

export const deleteProductById = (productId) => { return service.deleteProductById(productId) };


