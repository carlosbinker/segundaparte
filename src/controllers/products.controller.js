import * as service from '../services/products.service.js'

// Exporto el controlador que me va a traer toods los productos desde el array ficticio que me simula por ahora el modelo de la BD
// Igual situación intentamos realizar para el resto de los métodos
export const getAllProducts = (req, res) => {
  res.send(service.getAllProducts());
  console.log(service.getAllProducts())
};

// Método GET, recibiendo query string en la URL
export const searchProducts = (req, res) => {
  const { nombre } = req.query;

  // La búsqueda por nombre se resuleve en el servicio. El controlador sólo devuelve como respuesta los productos filtrados.

  const filteredProducts = service.searchProducts(nombre);
  res.json(filteredProducts);
  console.log("Los productos filtrados son:\n", filteredProducts);
};

// Método GET, recibiendo un id como params en la URL
export const getProductById = (req, res) => {
  const { id } = req.params;

  const product = service.getProductById(id);

  if (!product) {
    // si product me da un undefined
    res.status(404).json({ error: "No existe el producto" });
  }
  res.json(product);
  console.log("El producto encontrado es:\n", product);
};

// Método POST - añadir nuevo producto, el nuevo objeto se recibe mediante body
export const addNewProduct = (req, res) => {
  const { nombre, precio, vencimiento } = req.body;
  const newProduct = service.addNewProduct({ nombre, precio, vencimiento});

  res.status(201).json(newProduct);
  console.log("El producto añadido es:\n", newProduct);
};

// Método PUT - Update Product
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

// Delete Product
export const deleteProductById = (req, res) => {
  const productId = parseInt(req.params.id, 10);

  const deletedProduct = service.deletedProduct(productId);
  // const productIndex = service.getAllProducts().findIndex((objeto) => objeto.id == productId);

  if (deletedProduct == -1) {
    return res.status(404).json({ error: "Producto no encontrado para su borrado" });
  }
  // service.getAllProducts().splice(productIndex, 1); // Indica que me quita 1 elemento del array
  res.status(204).send(); // La convención 204 indica que se borra un recurso y el send() indica que no tiene contenido
};