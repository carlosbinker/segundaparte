<!-- # segundaparte
# API Rest en Node.js
En este repositorio se irán resolviendo los ejercicios propuestos desde la clase 9 a la clase 16, para así luego poder emprender el Proyecto final. -->

# Proyecto Final API Rest con Node.js con autenticación mediante JWT
## Resumen
Se trata de una API REST para gestión de productos desarrollada con Node.js y Express. Los datos suministrados por la API se almacenan en una base de datos. En concreto se emplea  Firestore, que es una base de datos no relacional (NoSQL) de la plataforma Google Firebase. El ejemplo de la BD de productos consiste en la gestión de venta de cruceros. La estructura del documento persigue utilizar los tipos de datos más relevantes que suministra Firestore.  Se empleará la siguiente estructura de documento base:

```json
{
        "id": "CKouPh9cdqr9sUdaQlP1",   // ID automático
        "disponibilidad": true,         // tipo de dato boolean
        "ship": "ALLURE OF THE SEAS",   // Tipo de dato string
        "itinerario": ["Miami", "Sea Day 2", "Cozumel", "Sea Day 4", "Nassau", "Miami"], // tipo de dato array
        "Excursiones": {"Nassau":  [
                "Cerdos nadadores y escapada a la playa de Pearl Island",
                "Día de playa y natación con delfines en la isla Laguna Azul"], 
                        "Cozumel": [
                "Buceo con esnórquel en el catamarán Fury y descanso en la playa",
                "Buceo para buzos certificados"]}, // Tipo de dato map
        "precio": 847, // Tipo de dato number
        "nombre" : "5 Night Eastern Caribbean Cruise", // Tipo de dato string
        "Port": "Miami" // Tipo de dato string
}
```
**NOTA**: 

Por tratarse de una BD NoSQL la estructura de cada documento puede tener cualquier formato (diferentes columnas y diferentes tipos de datos por cada columna; es una estructura muy flexible). Aunque por defecto son flexibles, muchas bases de datos de documentos (como MongoDB) permiten definir reglas de validación de esquema opcionales. Esto te permite imponer cierto nivel de consistencia si se necesita, sin perder la flexibilidad total.En este tipo de BD, al conjunto de todos los documentos se los llama colección (collection). El nombre de nuestra colleccón a emplear en esta API es **products**.

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](./Imagen%20para%20readme.png)


## A) Instalación

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
A continuación editar el archivo **`.env`** con los valores correspondientes para a su entorno.

4. Ejecutar en modo development:

```shell
npm run dev
```
## Documentación de la API
### Obtener todos los productos

- **GET** `/api/products`
- **Descripción:** Devuelve la lista de todos los productos.
- **Ejemplo de respuesta :**

```json
[
    {
    "id": "CKouPh9cdqr9sUdaQlP1",
    "disponibilidad": true,
    "ship": "ALLURE OF THE SEAS",
    "Excursiones":{"Nassau": ["Cerdos nadadores y escapada a la playa de Pearl Island", "Día de playa y natación con delfines en la isla Laguna Azul"], "Cozumel": ["Buceo con esnórquel en el catamarán Fury y descanso en la playa", "Buceo para buzo certificados"]},
    "precio": 847,
    "itinerario": ["Miami", "Sea Day 2", "Cozumel", "Sea Day 4", "Nassau","Miami"],
    "nombre": "5 Night Eastern Caribbean Cruise",
    "Port": "Miami"},
    {
    "id": "jFeywxYLDVqFXu2vntpP",
    "ship": "Serenade of the Seas",
    "Excursiones": {},
    "precio": 34,
    "disponibilidad": true,
    "nombre": "3 Night Miami To Panama Cruise",
    "itinerario": ["Miami", "At the Sea Day 2", "At the Sea Day 3","Colón, Panamá"],
    "Port": "Miami"
},
{
    "id": "P99AYMY9nvPbtA2KEKPY",
    "precio": 1429,
    "Port": "Miami",
    "nombre": "14-Day Hawaii from Los Angeles, CA",
    "ship": "Carnival Journeys",
    "Excursiones": {"Nawiliwili, Kauai": ["Jewels Of Hawaii–Waterfall & Tropical Garden Tour","Discover Kauai"],
        "Kahului, Maui": ["Maui Tropical Plantation","Maui Ocean Center & Kumu Farms Market"],
        "Hilo, Hawaii": ["Volcano Wine Tasting Tour", "Waterfalls Spectacular- Small Group"],
        "Honolulu, Oahu": ["Explore Oahu's North Shore", "Germaine's Luau", "Polynesian Cultural Center"],
        "Ensenada": ["Become a Tequila &Mezcal Connoisseur in theValley","Taste of Mexico & Margarita Madness"]},
        "itinerario": ["Day 1: Long Beach (Los Angeles)", "Day 2, 3, 4 & 5: Fun Day at Sea", "Day 6: Honolulu, Oahu",
        "Day 7: Kahului, Maui", "Day 8: Nawiliwili, Kauai", "Day 9: Hilo, Hawaii","Day 10, 11, 12 & 13: Fun Day at Sea",
        "Day 14: Ensenada", "Day 15: Long Beach (Los Angeles)"],
    "disponibilidad": true},
    {
    "id": "NG8D6RHwEPF8GHcVeAuy",
    "ship": "MSC Fantasía",
    "Excursiones": {"Montevideo": ["UN SABOR DE MONTEVIDEO Y SUS MARAVILLOSOS VINOS","CONOCE MONTEVIDEO"],
        "Buenos AIres": ["RECORRIDO POR EL DELTA DEL RÍO PARANÁ","GRAN TOUR DE BUENOS AIRESr"],
        "Río de Janeiro": ["Ipanema, Leblón, Copacabana y Barra de Tijuca", "Pan de Azúcar","Corcovado"],
        "Buzios": ["TRASLADO A LA PLAYA DE FERRADURA", "EXCURSIÓN EN CANOA Y SNORKEL"],
        "Ilhabella": ["CASCADA Y LA PLAYA CURRAL POR 4X4","VIAJE A LA PLAYA DO JABAQUARA EN GOLETA"],
        "Itajaí": ["PARQUE UNIPRAIAS", "CONOCE BLUMENAU, EL PUEBLO GEMÁNICO Y EL MUSEO DE LA CERVEZA"]},
    "precio": 1343,
    "disponibilidad": false,
    "nombre": "Sudamérica, 9 noches",
    "itinerario": ["Día 1: Montevideo", "Día 2: Buenos Aires", "Día 3 y 4 navegación", "Día 5: Río de Janeiro", "Día 6: Buzios",
        "Día 7: Ilhabella", "Día 8: Itajai", "Día 9: navegación", "Día 10:Montevideo"],
    "Port": "Montevideo"}
```
### Obtener producto por ID mediante params

- **GET** `/api/products/:id`
- **Descripción:** Devuelve un producto específico por su ID.
- **Parámetros:**
  - `id` (path, requerido): ID del producto.
- **Ejemplo de uso:** `/api/products/jFeywxYLDVqFXu2vntpP`
- **Respuesta ejemplo:**

```json
{
    "id": "jFeywxYLDVqFXu2vntpP",
    "ship": "Serenade of the Seas",
    "Excursiones": {},
    "precio": 34,
    "disponibilidad": true,
    "nombre": "3 Night Miami To Panama Cruise",
    "itinerario": ["Miami", "At the Sea Day 2", "At the Sea Day 3","Colón, Panamá"],
    "Port": "Miami"
}
```
### Filtrar producto por ID mediante query string

- **GET** `/api/products/search/?field=value`
- **Descripción:** Devuelve un producto específico cuando field = value.
  Para este caso se eligió filtrar por el campo nombre (string) o por el campo precio (number)
- **Parámetros:**
  - `id` (path, requerido): nombre y su valor exacto o el precio y su valor númerico exacto.
- **Ejemplo de uso con nombre:** /api/products/search/?nombre=3 Night Miami To Panama Cruise
- **Respuesta ejemplo:**
```json
{
    "id": "jFeywxYLDVqFXu2vntpP",
    "ship": "Serenade of the Seas",
    "Excursiones": {},
    "precio": 34,
    "disponibilidad": true,
    "nombre": "3 Night Miami To Panama Cruise",
    "itinerario": ["Miami", "At the Sea Day 2","At the Sea Day 3","Colón, Panamá"],
    "Port": "Miami"
}
```
- **Ejemplo de uso con precio:** /api/products/search/?precio=1343
- **Respuesta ejemplo:**
```json
{
    "id": "NG8D6RHwEPF8GHcVeAuy",
    "ship": "MSC Fantasía",
    "Excursiones": {"Montevideo": ["UN SABOR DE MONTEVIDEO Y SUS MARAVILLOSOS VINOS","CONOCE MONTEVIDEO"],
        "Buenos AIres": ["RECORRIDO POR EL DELTA DEL RÍO PARANÁ", "GRAN TOUR DE BUENOS AIRES"],
        "Río de Janeiro": ["Ipanema, Leblón, Copacabana y Barra de Tijuca", "Pan de Azúcar","Corcovado"],
        "Buzios": ["TRASLADO A LA PLAYA DE FERRADURA", "EXCURSIÓN EN CANOA Y SNORKEL"],
        "Ilhabella": ["CASCADA Y LA PLAYA CURRAL POR 4X4", "VIAJE A LA PLAYA DO JABAQUARA EN GOLETA"],
        "Itajaí": ["PARQUE UNIPRAIAS", "CONOCE BLUMENAU, EL PUEBLO GEMÁNICO Y EL MUSEO DE LA CERVEZA"]},
    "precio": 1343,
    "disponibilidad": false,
    "nombre": "Sudamérica, 9 noches",
    "itinerario": ["Día 1: Montevideo", "Día 2: Buenos Aires", "Día 3 y 4 navegación", "Día 5: Río de Janeiro", "Día 6: Buzios",
        "Día 7: Ilhabella", "Día 8: Itajai", "Día 9: navegación", "Día 10:Montevideo"],
    "Port": "Montevideo"}]
```
### Crear un producto

- **POST** `/api/products`
- **Descripción:** Crea un nuevo producto.
- **Body (JSON):**

```json
{
    "ship": "MSC Fantasía",
    "Excursiones": {"Montevideo":["UN SABOR DE MONTEVIDEO Y SUS MARAVILLOSOS VINOS", "CONOCE MONTEVIDEO"],"Buenos AIres":["RECORRIDO POR EL DELTA DEL RÍO PARANÁ", "GRAN TOUR DE BUENOS AIRESr"],
    "Río de Janeiro":["Ipanema, Leblón, Copacabana y Barra de Tijuca","Pan de Azúcar", "Corcovado"], "Buzios":["TRASLADO A LA PLAYA DE FERRADURA","EXCURSIÓN EN CANOA Y SNORKEL"],"Ilhabella": ["CASCADA Y LA PLAYA CURRAL POR 4X4", "VIAJE A LA PLAYA DO JABAQUARA EN GOLETA"], "Itajaí":["PARQUE UNIPRAIAS", "CONOCE BLUMENAU, EL PUEBLO GEMÁNICO Y EL MUSEO DE LA CERVEZA"]},
    "precio": 1343,
    "disponibilidad": false,
    "nombre": "Sudamérica, 9 noches",
    "itinerario": ["Día 1: Montevideo", "Día 2: Buenos Aires", "Día 3 y 4 navegación", "Día 5: Río de Janeiro", "Día 6: Buzios",
                       "Día 7: Ilhabella", "Día 8: Itajai", "Día 9: navegación", "Día 10:Montevideo"],
    "Port": "Montevideo"
}
```
- **Ejemplo de respuesta :**
  
```json
{
    "id": "NG8D6RHwEPF8GHcVeAuy",
    "ship": "MSC Fantasía",
    "Excursiones": {
        "Montevideo": ["UN SABOR DE MONTEVIDEO Y SUS MARAVILLOSOS VINOS","CONOCE MONTEVIDEO"],"Buenos AIres": ["RECORRIDO POR EL DELTA DEL RÍO PARANÁ", "GRAN TOUR DE BUENOS AIRESr"], "Río de Janeiro": ["Ipanema, Leblón, Copacabana y Barra de Tijuca", "Pan de Azúcar","Corcovado"], "Buzios": ["TRASLADO A LA PLAYA DE FERRADURA","EXCURSIÓN EN CANOA Y SNORKEL"],"Ilhabella": ["CASCADA Y LA PLAYA CURRAL POR 4X4","VIAJE A LA PLAYA DO JABAQUARA EN GOLETA"], "Itajaí": ["PARQUE UNIPRAIAS","CONOCE BLUMENAU, EL PUEBLO GEMÁNICO Y EL MUSEO DE LA CERVEZA"]},
    "precio": 1343,
    "disponibilidad": false,
    "nombre": "Sudamérica, 9 noches",
    "itinerario": ["Día 1: Montevideo", "Día 2: Buenos Aires", "Día 3 y 4 navegación", "Día 5: Río de Janeiro", "Día 6: Buzios",
                    "Día 7: Ilhabella", "Día 8: Itajai", "Día 9: navegación", "Día 10:Montevideo"],
    "Port": "Montevideo"}
```
### Actualizar un producto por ID 

- **PUT** `/api/products/:id`
- **Descripción:** Reemplazo completo del producto manteniendo su ID
- **Body (JSON):**
```json
{
    "ship": "MSC Fantasía",
    "precio": 1343,
    "disponibilidad": false,
    "nombre": "Sudamérica, 9 noches",
    "Port": "Montevideo"
}
```
Ejemplo de uso: `/api/products/id/CKouPh9cdqr9sUdaQlP1`
- **Ejemplo de respuesta :**
```json
{
    "id": "CKouPh9cdqr9sUdaQlP1",
    "ship": "MSC Fantasía",
    "precio": 1343,
    "disponibilidad": false,
    "nombre": "Sudamérica, 9 noches",
    "Port": "Montevideo"
}
```
Por lo tanto si ahora pido /api/products/CKouPh9cdqr9, obtengo la siguiente respuesta:
```json
{
    "id": "CKouPh9cdqr9sUdaQlP1",
    "ship": "MSC Fantasía",
    "precio": 1343,
    "disponibilidad": false,
    "nombre": "Sudamérica, 9 noches",
    "Port": "Montevideo"
}
```
### Actualizar un producto por ID 

- **PATCH** `/api/products/:id`
- **Descripción:** Reemplazo parcial del producto manteniendo su ID
- Ejemplo de uso: `/api/products/id/NG8D6RHwEPF8GHcVeAuy`
- **Body (JSON):**
```json
{
    "ship": "MSC Fantasía",
    "Excursiones": {
        "Montevideo": ["UN SABOR DE MONTEVIDEO Y SUS MARAVILLOSOS VINOS","CONOCE MONTEVIDEO"],"Buenos AIres": ["RECORRIDO POR EL DELTA DEL RÍO PARANÁ", "GRAN TOUR DE BUENOS AIRESr"], "Río de Janeiro": ["Ipanema, Leblón, Copacabana y Barra de Tijuca", "Pan de Azúcar","Corcovado"], "Buzios": ["TRASLADO A LA PLAYA DE FERRADURA","EXCURSIÓN EN CANOA Y SNORKEL"],"Ilhabella": ["CASCADA Y LA PLAYA CURRAL POR 4X4","VIAJE A LA PLAYA DO JABAQUARA EN GOLETA"], "Itajaí": ["PARQUE UNIPRAIAS","CONOCE BLUMENAU, EL PUEBLO GEMÁNICO Y EL MUSEO DE LA CERVEZA"]},
    "precio": 1343,
    "disponibilidad": false,
    "nombre": "Sudamérica, 9 noches",
    "itinerario": ["Día 1: Montevideo", "Día 2: Buenos Aires", "Día 3 y 4 navegación", "Día 5: Río de Janeiro", "Día 6: Buzios",
                    "Día 7: Ilhabella", "Día 8: Itajai", "Día 9: navegación", "Día 10:Montevideo"],
    "Port": "Montevideo"}
```
- **Ejemplo de respuesta :**
```json
{
    "id": "NG8D6RHwEPF8GHcVeAuy",
    "ship": "MSC Fantasía",
    "Excursiones": {"Buenos AIres": ["RECORRIDO POR EL DELTA DEL RÍO PARANÁ","GRAN TOUR DE BUENOS AIRESr"],
        "Río de Janeiro": ["Ipanema, Leblón, Copacabana y Barra de Tijuca", "Pan de Azúcar","Corcovado"],
        "Buzios": ["TRASLADO A LA PLAYA DE FERRADURA","EXCURSIÓN EN CANOA Y SNORKEL"],
        "Ilhabella": ["CASCADA Y LA PLAYA CURRAL POR 4X4", "VIAJE A LA PLAYA DO JABAQUARA EN GOLETA"],
        "Montevideo": ["UN SABOR DE MONTEVIDEO Y SUS MARAVILLOSOS VINOS", "CONOCE MONTEVIDEO"]},
    "precio": 1700,
    "disponibilidad": true,
    "nombre": "Sudamérica, 8 noches",
    "itinerario": ["Día 1: Buenos Aires", "Día 2 y 3 navegación", "Día 4: Río de Janeiro", "Día 5: Buzios", "Día 6: Ilhabella","Día 7: navegación", "Día 8 :Montevideo", "Día 9: Buenos Aires" ],
    "Port": "Buenos Aires"}
```
### Actualizar un producto por ID 

- **DELETE** `/api/products/:id`
- **Descripción:** Borra el producto de la colection productsa través de  su ID
- Ejemplo de uso: `/api/products/id/P99AYMY9nvPbtA2KEKPY`

## Autenticación `/api/products/auth/login`

Devuelve un token que debe colocarse en el header bajo la denominacion Bearer token

- **Respuesta:** 204 No Content
- ## Códigos de estado utilizados

- `200` - OK: Operación exitosa
- `201` - Created: Recurso creado exitosamente
- `204` - No Content: Recurso eliminado exitosamente
- `400` - Bad Request: Datos de entrada inválidos
- `404` - Not Found: Recurso no encontrado
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
