// Importo Express
import express from "express";
// Creo la instancia
const app = express();

//Defino rutas con método GET

app.get("/ping", (req, res) => {
  res.send("pong");
});

//Escucho en el puerto 3000

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}/`);
});
