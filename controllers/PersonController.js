//aqui ya seria solo necesario el de actualizar y eliminar 
// por que en el userControlloer modifique el metodo para que solo devuelva el id del usuario
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config/config.js";
import { PersonsModel } from "../model/PersonsModel.js";


                    //Metodo para actualizar 
export const updateUsers = async (req, res) => {
    const { nombreUsuario, descripcion } = req.body;
    if (!(nombreUsuario, descripcion)) {
        res.status(400).json({ message: "user is required" });
    }

    const personD = await PersonsModel.findOne({ where: { id: req.params.id } });

    if (personD) {
        //esos (...peronD) significa que me permite modificar los datos de la persona que yo quiera 
        personD.set({ ...personD, nombreUsuario: nombreUsuario, descripcion: descripcion });
        await personD.save();
        res.status(200).json({ message: "update" });
    } else {
        res.status(404).json({ message: "No encontrado" });
    }
};
