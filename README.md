# API Rest con Node.js con autenticación mediante JWT
## Resumen
Se trata de una API REST para gestión de productos desarrollada con Node.js y Express. Los datos suministrados por la API se almacenan en una base de datos. En concreto se emplea Firestore, que es una base de datos no relacional (NoSQL) de la plataforma Google Firebase. Se emplean dos colecciones que se denominan _users_ y _products_. En _users_ se almacenarán los usuarios registrados, mientras que en _products_ los productos que cada usuario defina. La estructura de los documentos de _products_ puede ser cualquiera. La estructura del usuario en el body tanto para el register como para el login debe ser la siguiente:

```json
{"username": "string",
"password": "string"}
```
**NOTA**: 

Por tratarse de una BD NoSQL la estructura de cada documento puede tener cualquier formato (diferentes columnas y diferentes tipos de datos por cada columna; es una estructura muy flexible). Aunque por defecto son flexibles, muchas bases de datos de documentos (como MongoDB) permiten definir reglas de validación de esquema opcionales. Esto permite imponer cierto nivel de consistencia si se necesita, sin perder la flexibilidad total. En este tipo de BD, al conjunto de todos los documentos se los llama colección (collection). 

__Diagrama funcional de una API REST__: 

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](./readme.png)


## Instalación

1. Clonar el repositorio
2. Instalar las dependencias

```shell
npm install
```
3. Configurar variables de entorno
   
```bash
# Copiar el archivo de ejemplo y completar con los datos dados por Firestore. Elegir la clave para la firma de JWT.
cp .env-example .env
```
A continuación editar el archivo **`.env`** con los valores correspondientes para su entorno.

1. Ejecutar en modo development:

```shell
npm run dev
```
## Documentación de la API

## 1. Autenticación

### Registro de un usuario
- **Descripción:** devuelve el usuario registrado y con la clave cifrada mediante bcrypt.

- **Método POST** endpoint: `/api/auth/register`

Estructura del body:

```json
{"username":"pirulito",
"password":"XIQGgK>vEWdY"}
```
- **Ejemplo de respuesta :**
```json
{
  "id": "10gqJkinGw83nJhtZYYJ",
  "username": "pirulito",
  "hashedPassword": "$2b$10$nsIx8iJLzHJPy8/Z3BxKLucRPx1oCPRD5aVbGr3ZefAwpFyBm/EZG"
}
```
### Login de un usuario 

- **Descripción:** si el usuario está registrado en la base de datos devuelve un token. Este token deberá colocarse en el header de los diferentes requests de manejo de productos bajo la denominacion Bearer token.

- **Método POST** endpoint: `/api/products/auth/login`

Estructura del body:

```json
{"username":"pirulito",
"password":"XIQGgK>vEWdY"}
```
- **Ejemplo de respuesta :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwZ3FKa2luR3c4M25KaHRaWVlKIiwiaWF0IjoxNzUzNjQwNDYzLCJleHAiOjE3NTM3MjY4NjN9.dvcEzROTWAMfjnLRjriqYWuU5swHEuhhWJuTYD3c7ZA"
}
```
## 2. Manipulación de los productos

### a) Obtener todos los productos

- **Descripción:** si el usuario está registrado se obtiene un array con todos sus productos.

- **Método GET** endpoint: `/api/products`

- **Ejemplo de respuesta :**

```json
[
  {
    "id": "25NKqyfmwM4l7vYjoC8Q",
    "nombre": "Producto 2",
    "category": [
      "limpieza",
      "pescados",
      "verdulería"
    ],
    "precio": 13.87
  },
  {
    "id": "CFRH3WskTTyWBxUdQe41",
    "category": [
      "limpieza",
      "carnes",
      "lácteos"
    ],
    "nombre": "Producto 1",
    "precio": 7.55
  }
]
```
### b) Actualizar un producto por ID 

- **Descripción:** se obtiene sólo el producto indicado por el ID en la URL.

- **Método GET** endpoint: `/api/products/id`

- **Ejemplo de respuesta :**
```json
{
  "id": "25NKqyfmwM4l7vYjoC8Q",
  "precio": 13.87,
  "category": [
    "limpieza",
    "pescados",
    "verdulería"
  ],
  "nombre": "Producto 2"
}
```
### c) Búsqueda de un producto mediante query string

- **Descripción:** filtra la búsqueda de un producto dentro de la collección _products_ cuando un determinado campo (_field_) es igual a un valor (_value_) asignado a dicho campo. Como en la URL siempre los valores se interpretan como strings, en el caso que un field determinado sea del tipo number o float, dicho valor deberá primero ser parseado a _parseFloat_ para su posterior correcto filtrado, ya que la BD a los valores declarados como _number_ no los interpreta como strings. Como no podemos saber que claves del documento de la colección products serán de tipo numbe o float, elegimos para filtrar el valor de clave _precio_ o _price_, como ejemplo.

- **Método GET** endpoint: `/api/products/search/?field=value`

- **Ejemplo de petición** 

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](request-get-query-string.png)

- **Ejemplo de respuesta :**

```json
[
  {
    "id": "25NKqyfmwM4l7vYjoC8Q",
    "category": [
      "condor",
      56
    ],
    "porotos": true,
    "nombre": "trapo de piso hilado fino",
    "price": 9.33477,
    "precio": 8500,
    "name": "trapo de piso hilado fino",
    "discount": -31
  }
]
```
### d) Agregar un producto a la BD

- **Descripción:** el producto se envía por medio del body con la estructura deseada.

- **Método POST** endpoint: `/api/products/`
- **Ejemplo de respuesta:**

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](./post.png)

### e) Actualización de un producto (reemplazo completo)

- **Descripción:** en este caso el reemplazo del producto a partir de su ID resulta de manera completa. La actualización es enviada a través del body.

- **Método PUT** endpoint: `/api/products/id`
- **Ejemplo de respuesta:**

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](./put.png)

### f) Actualización de un producto (reemplazo parcial)

- **Descripción:** en este caso el reemplazo del producto a partir de su ID resulta de manera parcial. La actualización es enviada a través del body, y sólo se actualizarán los campos que modifiquen su valor o los campos nuevos que se agreguen, los cuales también se incorporarán al documento.

- **Método PATCH** `/api/products/id`

- **Ejemplo de respuesta :**
  
![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](./patch.png)

### g) Borrado de un producto por ID 

- **Descripción:** Borra el producto de la colection products a través de  su ID

- **Método DELETE** `/api/products/id`

- **Respuesta:** 204 No Content (si el ID es correcto)

- ## Códigos de estado utilizados

- `200` - OK: operación exitosa
- `201` - Created: recurso creado exitosamente
- `204` - No Content: recurso eliminado exitosamente
- `400` - Bad Request: datos de entrada inválidos
- `404` - Not Found: recurso no encontrado
## Estructura del proyecto

```
src/
├── Controllers/
│   └── products.controller.js
├── Models/
│   └── Product.js
├── Routes/
│   └── products.router.js
└── Middlewares/
    └── auth.middleware.js
```