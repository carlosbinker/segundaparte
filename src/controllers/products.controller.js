// Listado de productos (array con objetos JSON) -- Lo mudamos ahora desde el módulo products.router.js

const products = [
  {
    id: 1,
    nombre: "queso fresco rallado",
    precio: 800,
    vencimiento: "30/11/25",
  },
  { id: 2, nombre: "queso roquefort", precio: 1200, vencimiento: "3/10/25" },
  { id: 3, nombre: "queso port salut", precio: 650, vencimiento: "16/8/25" },
  { id: 4, nombre: "queso cuartirolo", precio: 860, vencimiento: "13/9/26" },
];

// Exporto el controlador que me va a traer toods los productos desde el array ficticio que me simula por ahoera el modelo de la BD
export const getAllProducts = (req, res) => {
    res.send(products);
    console.log(products)
};

export const searchProducts = (req, res) => {
  // console.log(req.query);
  // Desestructuro por ejemplo el atributo nombre que me llega por query

  const { nombre } = req.query;
  console.log(nombre);
  const filteredProducts = products.filter((objeto) =>
    objeto.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
  res.json(filteredProducts);
};

export const getProductById = (req, res) => {
  // console.log(req.params)
  const { idproduct } = req.params;
  // console.log(idproduct)

  // Por lo tanto para obtener el producto dado por idproduct usamos el método find para recorrer el array de productos

  const product = products.find((objeto) => idproduct == objeto.id);

  // Vamos a agregar la respuesta con status 404 cuando el recurso no se encuentra, en este caso el producto con un dado idproduct

  // if (!product) {
  //   // si product me da un undefined

  //   res.status(404)
  //   res.send('No existe el producto indicado')
  // }
  // res.json(product)
  // console.log(product)

  // Voy a corregir lo anteior, no perdamos de vista que esto es una API, por lo tanto la respuesta deberá ser también un JSON

  if (!product) {
    // si product me da un undefined

    res.status(404).json({ error: "No existe el producto" });
  }
  res.json(product);
  console.log(product);
};

export const addNewProduct = (req, res) => {
  // Imprimo en consola el nuevo producto recibido en el body
  console.log(req.body);
  // Una forma de obtener los parámetros del body
  // const nombre = req.body.nombre
  // const precio = req.body.precio
  // const vencimiento = req.body.vencimiento

  // Otra manera de obtener los parámetros del body es mediante desestructuración

  const { nombre, precio, vencimiento } = req.body;
  // Muestro las propiedades
  console.log(nombre, precio, vencimiento);
  // res.send('POST');

  // Creo un nuevo producto para ser insertado en el array. La forma de probar esto es armando un objeto JSON con las 3 propiedades indicadas, es decir nombre, precio y vencimiento, el cual formará parte del body del mensaje http request enviado al server.

  const newProduct = {
    id: products.length + 1,
    nombre,
    precio,
    vencimiento,
  };

  // Lo introduzco al array mediante el método push y envío un status 201 indicando que se creó un nuevo producto (nuevo recurso)

  products.push(newProduct);
  res.status(201).json(newProduct);
  //   console.log(products)
};

export const updateProductById = (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((objeto) => objeto.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const { nombre, precio, vencimiento } = req.body;

  products[productIndex] = { id: productId, nombre, precio, vencimiento };
  res.json(products[productIndex]);
};

export const deleteProductById = (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((objeto) => objeto.id === productId);

  if (productIndex === -1) {
    return res
      .status(404)
      .json({ error: "Producto no encontrado para su borrado" });
  }
  products.splice(productIndex, 1); // Indica que me quita 1 elemento del array
  res.status(204).send(); // La convención 204 indica que se borra un recurso y el send() indica que no tiene contenido
};


