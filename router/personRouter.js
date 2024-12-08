import express from 'express';
import { updateUsers} from '../controllers/PersonController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.put('/person/:id',verifyToken, updateUsers);

export default rotuer;