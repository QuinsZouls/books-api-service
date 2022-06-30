## Books API Service

### Dataset

Para descargar el dataset de books debe hacerlo desde el siguiente [link]([Books Dataset | Kaggle](https://www.kaggle.com/datasets/saurabhbagchi/books-dataset?resource=download))

### Inicializar la base de datos

Para inicializar la BD con el dataset de books es necesario convertir el archivo .csv a .json, para ello se debe hacer uso del script csvToJSON:

```bash
CSV_FILE=path del archivo csv OUTPUT_FILE=./seed/books.json node seed/csvToJSON.js
```

Una vez generado el archivo .json verificar que se encuentre en la capeta ./seed/ y su nombre corresponda al modelo de la BD

### Environment

Antes de iniciar la instancia de docker, debe aseguarse que cuente con el archivo de variables de entorno: .env.{{environment}}.local, ejemplo:

.env.development.local

Este archivo deberá contener las siguientes variables:

```bash
# PORT
PORT = 3000

# DATABASE
DB_HOST = mongo
DB_PORT = 27017
DB_DATABASE = books

# LOG
LOG_FORMAT = dev
LOG_DIR = ../logs

# CORS
ORIGIN = *
CREDENTIALS = true

```

En caso de utilizar docker usar el DB_HOST como 'mongo'.

Nota: si no se especifica el archivo env tendrá que especificar cada una de las variables de entorno.



### Iniciar servicio

Para levantar el servicio con la base de datos es necesario utilizar docker y docker-compose:

```bash
docker-compose up
```



### Documentación

Se genera la ruta /api-docs mediante Swagger para visualizar la documentanción de la API 



### Pruebas unitarias

Para las pruebas unitarias utilizamos jest con el siguiente comando:

```bash
npm run test
```
