import * as model from '../models/Product.js'

// Método GET - obtengo todos los productos de Firestore
export const getAllProducts = async (req, res) => {
  const products = await model.getAllProducts();
  res.json(products); // El status de 200 OK lo introduce express por default cuando el request es existoso!
  // console.log(products);
};

// Método GET - recibiendo query string en la URL en req.query
export const searchProductsByField = async (req, res) => {
  const query = Object.keys(req.query); // Me devuelve un array con las claves de la query string
  const field = Object.keys(req.query)[0]; // Obtengo el field para filtrar (primera clave)
  let value = req.query[field]; // Valor del field
  console.log(query);
  console.log(field);
  console.log(value);
  if (field == "precio") {
    value = parseInt(value);
  }
  console.log(typeof value);
  
  const filteredProducts = await model.searchProductsByField(field, value);
  res.status(200).json(filteredProducts); // No haría falta colocar el res.status(200), lo pone express por default.
};

// Método GET - obtengo un solo documento referenciado por el id en la URL desde Firestore
export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await model.getProductById(id);
  if (!product) {
    return res.status(404).json({ error: "No existe el producto" });
  }
  res.json(product);
  // console.log("Producto solicitado mediante params:\n",product);
  // console.log(typeof product);
};

// Método POST - añadir nuevo producto, el nuevo objeto se recibe mediante req.body
export const addNewProduct = async (req, res) => {
  // const { nombre, precio, vencimiento, perecedero, keyWords } = req.body;
  const producto = req.body;
  console.log(producto);
  if (!producto) {
    return res.status(400).json({ "message": "No se introdujo ningún producto" }); // status 400 Bad request!
  }
  // const newProduct = await model.addNewProduct({ nombre, precio, vencimiento, perecedero, keyWords });
  const newProduct = await model.addNewProduct(producto);
  res.status(201).json(newProduct); // status 201 indica recurso creado con éxito
  console.log("Producto creado exitosamente\n", newProduct);
};

// Método PUT - Update Product, la actualización del producto se recibe por req.body al igual que POST
export const updatePutProductById = async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const updateProduct = await model.updatePutProductById(productId, productData);
  if (!updateProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(updateProduct);
  console.log("El producto actualizado es:\n", updateProduct);
};

// Método PATCH - Update Product, la actualización del producto se recibe por req.body al igual que POST
export const updatePatchProductById = async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const updateProduct = await model.updatePatchProductById(productId, productData);
  if (!updateProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(updateProduct);
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
  res.status(204).send(); // La convención 204 indica que se borra un recurso y el send() indica que no tiene contenido. No lleva cuerpo !!

  /*Para tu escenario donde "el producto existía y se borró", res.status(204).send(); es la elección correcta y semánticamente adecuada según las convenciones de las API RESTful. No deberías intentar enviar un JSON con un 204.*/
};