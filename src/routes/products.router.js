import { Router } from 'express';

// Desestructuro el módulo Router desde express para el manejo de las rutas
export { Router } from 'express';

// Creo una instancia de Router
const router = Router();

// Agregado de una ruta que devuelve un JSON
// Listado de productos (array con objetos JSON)

const products = [
  { id: 1, nombre: "queso fresco rallado", precio: 800, vencimiento: "30/11/25" },
  { id: 2, nombre: "queso roquefort", precio: 1200, vencimiento: "3/10/25" },
  { id: 3, nombre: "queso port salut", precio: 650, vencimiento: "16/8/25" },
  { id: 4, nombre: "queso cuartirolo", precio: 860, vencimiento: "13/9/26" },
];

// Acá vamos a traernos todas las rutas con sus métodos (esquema CRUD) que teníamos en index.js, y vamos a reemplazar router por router

// Primera ruta con GET trayendo todos los productos
router.get("/products", (req, res) => {
    res.send(products);
  });
  
// Segunda ruta con GET pero ahora empleando query string -- se cambió el orden, antes se había puesto como tercera opción.
  
// El Query String (o cadena de consulta en español) es una parte fundamental de una URL (Uniform Resource Locator) que se utiliza para enviar información adicional del cliente al servidor web. Es un mecanismo estándar en el protocolo HTTP para pasar datos a través de la URL, cuando se usa el método GET.
  
// Un Query String siempre comienza con un signo de interrogación (?) y se adjunta al final de la ruta de la URL. Después del ?, los datos se organizan en pares clave-valor, separados por el signo igual (=). Si hay múltiples pares clave-valor, se separan entre sí con el signo ampersand (&).
  
router.get("/products/search", (req, res) => {
    // console.log(req.query);
  
    // Desestructuro por ejemplo el atributo nombre que me llega por query
  
    const { nombre } = req.query
    console.log(nombre)
    const filteredProducts = products.filter((objeto) => objeto.nombre.toLowerCase().includes(nombre.toLowerCase()));
    res.json(filteredProducts)
  });
  
  // Tercera ruta con GET pero usando params (la idea es traer el producto indicado por el idproduct, ejemplo /products/2)
  
  router.get("/products/:idproduct", (req, res) => {
    // console.log(req.params)
    const {idproduct} = req.params
    // console.log(idproduct)
  
    // Por lo tanto para obtener el producto dado por idproduct usamos el método find para recorrer el array de productos
  
    const product = products.find((product) => idproduct == product.id)
  
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
    
        res.status(404).json({error: "No existe el producto"})
      }
      res.json(product)
      console.log(product)
    
  });
  
  // Cuarta ruta con POST
  
  router.post("/products", (req, res) => {
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
  });
  
  // Quinta ruta ahora con método PUT
  
  router.put("/products/:id", (req, res) => {
    
    const productId = parseInt(req.params.id, 10);
    const productIndex = products.findIndex((objeto) => objeto.id === productId);
  
    if (productIndex === -1) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
  
    const { nombre, precio, vencimiento } = req.body;
  
    products[productIndex] = { id: productId, nombre, precio, vencimiento };
    res.json(products[productIndex]);
  });
  
  // Sexta ruta con DELETE
  
  router.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const productIndex = products.findIndex((objeto) => objeto.id === productId);
  
    if (productIndex === -1) {
      return res.status(404).json({error: "Producto no encontrado para su borrado"});
    }
    products.splice(productIndex, 1); // Indica que me quita 1 elemento del array
    res.status(204).send(); // La convención 204 indica que se borra un recurso y el send() indica que no tiene contenido
  })

// Exporto router por default para que en otro módulo se pueda cambiar el nombre (a diferencia de lo que sería una exportación nombrada)
// Ejemplo de exportación nombrada const Hola = () => {}
export default router;

