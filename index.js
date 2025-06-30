// Importo Express
import express from "express";
// Creo la instancia
const app = express();

// Agregado de una ruta de bienvenida que devuelve un HTML

app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a la API REST</h1>");
});

// Agregado de una ruta que devuelve un JSON

const products = [
  { id: 1, nombre: "queso fresco", precio: 800, vencimiento: "30/11/25" },
  { id: 2, nombre: "queso roquefort", precio: 1200, vencimiento: "3/10/25" },
  { id: 3, nombre: "queso port salut", precio: 650, vencimiento: "16/8/25" },
  { id: 4, nombre: "queso cuartirolo", precio: 860, vencimiento: "13/9/26" },
];

// Primera ruta con GET trayendo todos los productos
app.get("/products", (req, res) => {
  res.send(products);
});

// Segunda ruta con GET pero usando params (la idea es traer el producto indicado por el idproduct, ejemplo /products/2)

app.get("/products/:idproduct", (req, res) => {
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


// Tercera ruta con GET pero ahora empleando query string

// El Query String (o cadena de consulta en español) es una parte fundamental de una URL (Uniform Resource Locator) que se utiliza para enviar información adicional del cliente al servidor web. Es un mecanismo estándar en el protocolo HTTP para pasar datos a través de la URL, cuando se usa el método GET.

// Un Query String siempre comienza con un signo de interrogación (?) y se adjunta al final de la ruta de la URL. Después del ?, los datos se organizan en pares clave-valor, separados por el signo igual (=). Si hay múltiples pares clave-valor, se separan entre sí con el signo ampersand (&).

app.get("/products/search", (req, res) => {
  console.log(req.query);
  res.send(products)
});



//Escucho en el puerto 3000

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}/`);
});
