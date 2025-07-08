import fs from "fs";
import path from "path";

const __dirname = import.meta.dirname;

const jsonPath = path.join(__dirname, "./products.json");
const json = fs.readFileSync(jsonPath, "utf-8");
const products = JSON.parse(json); // Transformo el JSON en un objeto javascript

// Métodos GET
export const getAllProducts = () => {return products};
    
export const searchProducts = (nombre) => {return products.filter((objeto) => objeto.nombre.toLowerCase().includes(nombre.toLowerCase()))};

export const getProductById = (id) => {return products.find((objeto) => id == objeto.id)};

// Método POST - Agrrego producto
export const addNewProduct = (data) => {
  const newProduct = {
    id: products.length + 1,
    ...data,
  };
  products.push(newProduct);
  return newProduct;
};

// Método PUT - Actualizo el producto en el array de productos, según el id recibido
export const updateProductById = (productId, data) => {
  const productIndex = products.findIndex((objeto) => objeto.id === productId);
  products[productIndex] = {
    id: productIndex+1,
    ...data
  };
  return products[productIndex];
};

// Método DELETE - Borro el producto dado por el Id
export const deleteProductById = (productId) => {
  const productIndex = products.findIndex((objeto) => objeto.id === productId);
  return products.splice(productIndex, 1); 
};