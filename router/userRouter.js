import express from 'express';
import {getUser, getOneUser, createUsers, updateUsers, updateUsersEmail, updateUsersPassword, deleteUsers, login } from '../controllers/userController.js';
import  {verifyToken}  from '../middleware/auth.js';
const rotuer = express.Router();

rotuer.get('/user',verifyToken, getUser);
rotuer.get('/user/:id',verifyToken, getOneUser);
rotuer.post('/register', createUsers);
rotuer.put('/user/:id',verifyToken, updateUsers);
rotuer.delete('/user/:id', verifyToken, deleteUsers);

rotuer.post('/login', login);
rotuer.put('/user/email/:id',verifyToken, updateUsersEmail);
rotuer.put('/user/password/:id',verifyToken, updateUsersPassword);

export const userRouter = rotuer;