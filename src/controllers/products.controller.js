import * as service from '../services/products.service.js'

// Exporto el controlador que me va a traer toods los productos desde el array ficticio que me simula por ahora el modelo de la BD
export const getAllProducts = (req, res) => {
  res.send(service.getAllProducts());
  console.log(service.getAllProducts())
};

export const searchProducts = (req, res) => {
  const { nombre } = req.query;
  const filteredProducts = service.getAllProducts().filter((objeto) => objeto.nombre.toLowerCase().includes(nombre.toLowerCase()));
  res.json(filteredProducts);
  console.log("Los productos filtrados son:\n", filteredProducts);
};

export const getProductById = (req, res) => {
  const { id } = req.params;
  const product = service.getAllProducts().find((objeto) => id == objeto.id);

  if (!product) {
    // si product me da un undefined
    res.status(404).json({ error: "No existe el producto" });
  }
  res.json(product);
  console.log("El producto encontrado es:\n", product);
};

export const addNewProduct = (req, res) => {
  const { nombre, precio, vencimiento } = req.body;
  // Muestro las propiedades
  console.log("Valores recibidos por body:", nombre, precio, vencimiento);
  // Creo un nuevo producto para ser insertado en el array. La forma de probar esto es armando un objeto JSON con las 3 propiedades indicadas, es decir nombre, precio y vencimiento, el cual formará parte del body del mensaje http request enviado al server.

  const newProduct = {
    id: service.getAllProducts().length + 1,
    nombre,
    precio,
    vencimiento,
  };

  // Lo introduzco al array mediante el método push y envío un status 201 indicando que se creó un nuevo producto (nuevo recurso)

  service.getAllProducts().push(newProduct);
  res.status(201).json(newProduct);
  console.log("El producto añadido es:\n", newProduct);
};

export const updateProductById = (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = service.getAllProducts().findIndex((objeto) => objeto.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const { nombre, precio, vencimiento } = req.body;

  service.getAllProducts()[productIndex] = {
    id: productId,
    nombre,
    precio,
    vencimiento,
  };
  res.json(service.getAllProducts()[productIndex]);
  console.log("El producto actualizado es:\n",service.getAllProducts()[productIndex]);
};

export const deleteProductById = (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = service.getAllProducts().findIndex((objeto) => objeto.id === productId);

  if (productIndex === -1) {
    return res
      .status(404)
      .json({ error: "Producto no encontrado para su borrado" });
  }
  service.getAllProducts().splice(productIndex, 1); // Indica que me quita 1 elemento del array
  res.status(204).send(); // La convención 204 indica que se borra un recurso y el send() indica que no tiene contenido
};