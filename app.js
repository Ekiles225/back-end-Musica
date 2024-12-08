
import express from 'express';
import cors from "cors";
import { PORT } from './config/config.js';
import { userRouter } from './router/userRouter.js';
import { sequelize } from "./db/conexion.js";
import  personrouter  from './router/personRouter.js';

const _PORT = PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

// app.use('/api', rotuerTypeUsers);
app.use('/api', userRouter);
app.use('/api', personrouter);


const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ alter: false }) // cambiar a true para que actualice la base de datos y volver a poner en flase
        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
}
main();