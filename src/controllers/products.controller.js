import * as service from '../services/products.service.js'

// Método GET - obtengo todos los productos de un JSON
export const getAllProducts = (req, res) => {
  res.send(service.getAllProducts());
};

// Método GET - recibiendo query string en la URL en req.query
export const searchProducts = (req, res) => {
  const { nombre } = req.query;
  const filteredProducts = service.searchProducts(nombre);
  res.json(filteredProducts);
};

// Método GET - recibiendo un id como params en la URL en req.params
export const getProductById = (req, res) => {
  const { id } = req.params;
  const product = service.getProductById(id);
  if (!product) {
    res.status(404).json({ error: "No existe el producto" });
  }
  res.json(product);
};

// Método POST - añadir nuevo producto, el nuevo objeto se recibe mediante req.body
export const addNewProduct = (req, res) => {
  const { nombre, precio, vencimiento } = req.body;
  const newProduct = service.addNewProduct({ nombre, precio, vencimiento});
  res.status(201).json(newProduct);
};

// Método PUT - Update Product, la actualización del producto se recibe por req.body al igual que POST
export const updateProductById = (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const { nombre, precio, vencimiento } = req.body;
  const updateProduct = service.updateProductById(productId, {nombre, precio, vencimiento});
  if (updateProduct === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(updateProduct);
  console.log("El producto actualizado es:\n", updateProduct);
};

// Método DELETE - Delete Product
export const deleteProductById = (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const deletedProduct = service.deleteProductById(productId);
  if (deletedProduct == -1) {
    return res.status(404).json({ error: "Producto no encontrado para su borrado" });
  }
  res.status(204).send(); // La convención 204 indica que se borra un recurso y el send() indica que no tiene contenido
};