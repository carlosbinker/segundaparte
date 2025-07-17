import * as model from '../models/Product.js'

// Método GET - obtengo todos los productos de Firestore
export const getAllProducts = async (req, res) => {
  const products = await model.getAllProducts();
  res.send(products);
  // console.log(products);
};

// Método GET - recibiendo query string en la URL en req.query
export const searchProducts = (req, res) => {
  const { nombre } = req.query;
  const filteredProducts = model.searchProducts(nombre);
  res.json(filteredProducts);
};

// Método GET - obtengo un solo documento referenciado por el id en la URL desde Firestore
export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await model.getProductById(id);
  if (!product) {
    res.status(404).json({ error: "No existe el producto" });
  }
  res.json(product);
  console.log(product);
  // console.log(typeof product)
};

// Método POST - añadir nuevo producto, el nuevo objeto se recibe mediante req.body
export const addNewProduct = async (req, res) => {
  // const { nombre, precio, vencimiento, perecedero, keyWords } = req.body;
  const producto = req.body;
  // const newProduct = await model.addNewProduct({ nombre, precio, vencimiento, perecedero, keyWords });
  const newProduct = await model.addNewProduct(producto);
  res.status(201).json(newProduct);
};

// Método PUT - Update Product, la actualización del producto se recibe por req.body al igual que POST
export const updateProductById = async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const updateProduct = await model.updateProductById(productId, productData);
  if (!updateProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.status(200).json(updateProduct);
  console.log("El producto actualizado es:\n", updateProduct);
};

// Método DELETE - Delete Product
export const deleteProductById = async (req, res) => {
  // const productId = parseInt(req.params.id, 10);
   const productId = req.params.id;
  // console.log(productId);
  const deletedProduct = await model.deletedProductById(productId);
  if (!deletedProduct) {
    return res.status(404).json({ error: "Producto no encontrado para su borrado" });
  }
  res.status(204).send(); // La convención 204 indica que se borra un recurso y el send() indica que no tiene contenido
};