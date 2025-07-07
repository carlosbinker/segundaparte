// Listado de productos (array con objetos JSON) -- Lo mudamos ahora desde el módulo products.controllers.js. Simularemos por ahora que hay un servicio que le brindará los datos a los controladores.

const products = [
  {
    id: 1,
    nombre: "queso fresco",
    precio: 800,
    vencimiento: "30/11/25",
  },
  { id: 2, nombre: "queso roquefort", precio: 1200, vencimiento: "3/10/25" },
  { id: 3, nombre: "queso port salut", precio: 650, vencimiento: "16/8/25" },
  { id: 4, nombre: "queso gruyere", precio: 860, vencimiento: "13/9/26" },
  { id: 5, nombre: "queso provolone", precio: 975, vencimiento: "13/9/26" }
];

export const getAllProducts = () => { return products };

export const searchProducts = (nombre) => { return products.filter((objeto) => objeto.nombre.toLowerCase().includes(nombre.toLowerCase())) };

export const getProductById = (id) => { return products.find((objeto) => id == objeto.id) };

// export const addNewProduct = (nombre, precio, vencimiento) => {

//   const newProduct = {
//     id: products.length + 1,
//     nombre,
//     precio,
//     vencimiento
//   };

//   products.push(newProduct);
//   return newProduct;
// };

// Otra variante
export const addNewProduct = (data) => {
  //   console.log({ ...data });

  const newProduct = {
    id: products.length + 1,
    ...data,
  };

  products.push(newProduct);
  return newProduct;
};

// Actualizo el producto en el array de productos, según el id recibido
export const updateProductById = (productId, data) => {
  const productIndex = products.findIndex((objeto) => objeto.id === productId);

  console.log(productIndex);

  products[productIndex] = {
    id: productIndex+1,
    ...data
  };
  return products[productIndex];
};

// Borro el producto dado por el Id
export const deletedProduct = (productId) => {
  const productIndex = products.findIndex((objeto) => objeto.id === productId);

  return products.splice(productIndex, 1); // Indica que me quita 1 elemento del array

};