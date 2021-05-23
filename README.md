En este proyecto se calcularán los costes de los precios con IVA de los ordenadores vendidos, ademas de calcular cuales son los más antiguos y anticuados

//Comandos a introducir para empezar a trabajar (-g es global y se hace 1 sola vez):

npm init --yes
npm install -g typescript
npm install tsc-init -g
npm install mongoose
npm install @types/mongoose
npm i @types/node@14.14.6
npx tsc -w

//Para ejecutar en local este trabajo
- npm install
- tsc -w
- npm run dev


//Para subir a GitHub
- git init
- git add .
- git commit -m "lo que sea"
- git branch -M main   // Escogemos el nombre de la rama
- git remote add origin https://github.com/DanielMNpdv/restAPI-ARINTEC.git
- git push -u origin main

//Para ver a donde apunta cada rama
- git log --oneline --decorate

//Para Cambiar de rama
- git checkout rama002
- git add .
- git commit -m "en nueva rama"

git push -u origin rama002   
//para subir a heroku

instalar heroku cli
ejecutar heroku login
ejecutar en la carpeta raiz del proyecto:
- git init
- git add .

poner en el gitignore todo lo que no quieres que se suba (lo que se compile)
eliminar todas las rutas de https://localhost:xxxx
ejecutar: 
- git add .
- git commit -m "lo que sea"
- git branch -M rama001   // Escogemos el nombre de la rama
- heroku git:remote -a mi-1api-rest
- git push heroku master

Una vez subido el proyecto tenemos que crear una variable de entorno desde la web de heroku:
MONGODB_URI=direccion de tu base de datos en atlas
Tu base de datos tiene que tener un usuario que tenga todos los permisos,
y una lista blanca que permita conexiones desde todas las redes
Posteriormente tienes que conectarte a tu aplicacion de heroku desde la web de mongo, clickando en connect.
Ahora te mostrara una url que tienes que copiar y pegar en la variable de entorno que creaste antes

//Comandos heroku
Si está ejecutándose en heroku los mensajes de consola se ven con:
- heroku logs -a <APP> --tail
