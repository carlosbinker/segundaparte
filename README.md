<!-- # segundaparte
# API Rest en Node.js
En este repositorio se irán resolviendo los ejercicios propuestos desde la clase 9 a la clase 16, para así luego poder emprender el Proyecto final. -->

# Proyecto Final API Rest con Node.js
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
- 
```json
[
    {
        "id": "CKouPh9cdqr9sUdaQlP1",
        "disponibilidad": true,
        "ship": "ALLURE OF THE SEAS",
        "Excursiones": {
            "Nassau": [
                "Cerdos nadadores y escapada a la playa de Pearl Island",
                "Día de playa y natación con delfines en la isla Laguna Azul"
            ],
            "Cozumel": [
                "Buceo con esnórquel en el catamarán Fury y descanso en la playa",
                "Buceo para buzos certificados"
            ]
        },
        "precio": 847,
        "itinerario": [
            "Miami",
            "Sea Day 2",
            "Cozumel",
            "Sea Day 4",
            "Nassau",
            "Miami"
        ],
        "nombre": "5 Night Eastern Caribbean Cruise",
        "Port": "Miami"
    },
    {
        "id": "Et6u9lMFOnPQ4zuMmeRh",
        "Excursiones": {
            "Cozumel": [
                "Buceo con esnórquel en el catamarán Fury y descanso en la playa",
                "Buceo para buzos certificados"
            ],
            "Nassau": [
                "Cerdos nadadores y escapada a la playa de Pearl Island",
                "Día de playa y natación con delfines en la isla Laguna Azul"
            ]
        }
    },
    {
        "id": "NUPgwzYI2AiC9N7C0YJX",
        "vencimiento": "13/9/26",
        "nombre": "queso Santa Rosa",
        "precio": 19975
    },
    {
        "id": "OOBAW2b049UCx9xtcGDV",
        "nombre": "queso Santa Rosa",
        "vencimiento": "13/9/26",
        "precio": 19975
    },
    {
        "id": "dJzwdQ3cSh6bLOHMoFm7",
        "ship": "ALLURE OF THE SEAS",
        "precio": 519,
        "itinerario": [
            "Miami",
            "Sea Day 2",
            "Cozumel",
            "Sea Day 4",
            "Nassau",
            "Miami"
        ],
        "nombre": "5 Night Eastern Caribbean Cruise",
        "imagenes": {
            "Day 4 At the Sea": "",
            "Nassau": "https://www.royalcaribbean.com/lac/es/shore-excursions/itinerary/5-night-eastern-caribbean-cruise-from-miami-on-allure/AL05MIA-2694212250?country=ARG",
            "Day 2 At the Sea": "",
            "End": "Miami",
            "Miami": "",
            "Cozumel": "https://www.royalcaribbean.com/lac/es/shore-excursions/itinerary/5-night-eastern-caribbean-cruise-from-miami-on-allure/AL05MIA-2694212250?country=ARG"
        },
        "Port": "Miami",
        "Excursiones": {
            "Cozumel": [
                "Buceo con esnórquel en el catamarán Fury y descanso en la playa",
                "Buceo para buzos certificados"
            ],
            "Nassau": [
                "Cerdos nadadores y escapada a la playa de Pearl Island",
                "Día de playa y natación con delfines en la isla Laguna Azul"
            ]
        },
        "disponibilidad": true
    },
```