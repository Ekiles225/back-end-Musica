import { userModels } from "../model/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TOKEN_KEY } from "../config/config.js";
import { PersonsModel } from "../model/PersonsModel.js";

            //funcion para obtener los datos del usuario (TODOS)
export const getUser = async (req, res) => {
    try {
      const users = await userModels.findAll({
        attributes: ['id', 'nombre', 'apellido', 'correo', 'telefono', 'pasword']
      },{where: {state:true}});
    
      res.status(200).json({users});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

                //funcion para obtener a un usuario 
                export const getOneUser = async (req, res) => {
                  try {
                    const user = await userModels.findOne({
                      attributes: ['id', 'nombre','apellido','correo', 'telefono','person_id'] ,
                      where:{id:req.params.id},
                      include: [
                        {
                          model: PersonsModel,
                        }
                      ]
                    });
                    if(!user){
                      res.status(404).json({message: "user not found"});
                    }
                    res.status(200).json({user});
                  } catch (error) {
                    res.status(500).json({ error: error.message });
                  }
                  
                };


//crear usuario funcion para aquello 

export const createUsers = async (req, res) => {
    try {
      const { nombre, apellido, correo, telefono, pasword} = req.body;
      if (!(nombre ||  apellido ||  correo || telefono || pasword)) {
        res.status(400).json({ message: "all input is required" });
      }
      // checa si el correo existe 
      // valida si el correo existe en la base de datos 
      const oldUser = await userModels.findOne({ where: { correo: correo } });
      if (oldUser) {
        return res.status(409).json("correo already exist");
      }
      //Encrypt user password
     const encryptedPassword = await bcrypt.hash(pasword.toString(),10);

     const person = await PersonsModel.create();//esto es lo que agregue

      // Create user in our database
      const users = await userModels.create({
        nombre,
        apellido,
        correo: correo.toLowerCase(), // sanitize: convert email to lowercase
        telefono,
        pasword: encryptedPassword,
        person_id:person.id
      });
      // crea el token
      const token = jwt.sign({ user_id: users.id, correo }, TOKEN_KEY, {
        expiresIn: "1h",
      });
      // save user token
      // users.token = token;
      res.status(201).json({ users, token: token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

                    //Metodo para actualizar 
export const updateUsers = async (req, res) => {
    const { nombre } = req.body;
    if (!(nombre)) {
      res.status(400).json({ message: "user is required" });
    }
    const userD = await userModels.findOne({where:{id:req.params.id}});
    if(userD){
      userD.set({...userD, nombre:nombre});
        await userD.save();
        res.status(200).json({ message: "update" });
    }else{
        res.status(404).json({message: "user not found"});
    }
};
                    //Actualiza el correro
export const updateUsersEmail = async (req, res) => {
    const { correo } = req.body;
    if (!(correo)) {
      res.status(400).json({ message: "email is required" });
    }
    const oldUser = await userModels.findOne({ where: { correo: correo } });
    if (oldUser) {
      return res.status(409).json("email already exist");
    }
    const userD = await userModels.findOne({where:{id:req.params.id}});
    if(userD){
      userD.set({...userD,correo:correo});
        await userD.save();
        res.status(200).json({ message: "update" });
    }else{
        res.status(404).json({message: "user not found"});
    }
};

                    //Actualizar la contraseña 

export const updateUsersPassword = async (req, res) => {
    const { pasword } = req.body;
    if (!(pasword)) {
      res.status(400).json({ message: "password is required" });
    }
    const userD = await userModels.findOne({where:{id:req.params.id}});
    if(userD){
      userD.set({...userD,pasword:pasword});
        await userD.save();
        res.status(200).json({ message: "update" });
    }else{
        res.status(404).json({message: "user not found"});
    }
};

                        //MEtodo para eliminar 

export const deleteUsers = async (req, res) => {
    const user = await userModels.findOne({ where: { id: req.params.id } });
    if (user) {
      user.set({ ...user, state: false });
      await user.save();
      res.status(200).json({ message: "delete" });
    } else {
      res.status(404).json({ message: "type not found" });
    }
};

                            //loguin 

export const login = async (req, res) => {
    try {
      const { correo, pasword } = req.body;
      if (!(correo && pasword)) {
        res.status(400).json({message:"All input is required"});
      }
      const user = await userModels.findOne({
        where: { correo: correo.toLowerCase() },
      });
       // Check if user exists
       if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Validate password
      const isPasswordValid = await bcrypt.compare(pasword, user.pasword);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
     // If everything is valid, generate a token
      const token = jwt.sign({ user_id: user.id, correo }, TOKEN_KEY, {
        expiresIn: "1h",
      });
        let dataUser={
            id:user.id,
            user:user.user,
            correo:user.correo,
            typeusers_id:user.typeusers_id
        }
        res.status(200).json({ dataUser, token: token });
    } catch (err) {
      console.error("Login:", err.message );
      res.status(500).json({ error: err.message });
    }
};

                    //REfresca

// export const refresh = (req, res) => {
//     const token = req.headers["authorization"].split(" ")[1];
//       if (!token) {
//           return res.status(401).end()
//       }
//       var payload
//       try {
//           payload = jwt.verify(token, 'secret')
//       } catch (e) {
//           if (e instanceof jwt.JsonWebTokenError) {
//               return res.status(401).end()
//           }
//           return res.status(400).end()
//       }
//       const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
//       if (payload.exp - nowUnixSeconds > 30) {
//           return res.status(400).end()
//       }
//       const newToken = jwt.sign({ username: payload.username }, jwtKey, {
//           algorithm: "HS256",
//           expiresIn: jwtExpirySeconds,
//       })
//       res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 })
//       res.end()
// }

//erick villa