import  express from 'express';
const app = express()
const port = 3000
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './db/conexion.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//conecccion a mi base de datos con el siguiente metodo

const main= async () =>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`)
    })
} catch (error) {
    console.error(`Error ${error}`);
}
}
main();