
import express from 'express';
import cors from "cors";
import { PORT } from './config/config.js';
import { userRouter } from './router/userRouter.js';
import { sequelize } from "./db/conexion.js";
import  personrouter  from './router/personRouter.js';
import playListRouter from './router/playListRouter.js';
//imagenes 
import path from 'path';
import { fileURLToPath } from 'url';
// import rotuerTypeUsers from './router/TypeUsersRouter.js';

const _PORT = PORT || 3306;
const app = express();
//imagenes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use('/api', rotuerTypeUsers);
app.use('/api', userRouter);
app.use('/api', personrouter);
app.use('/api', playListRouter);


const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ alter: false  }) // cambiar a true para que actualice la base de datos y volver a poner en flase
        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
}
main();