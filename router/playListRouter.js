import express from 'express';
import { createPlaylist, getPlaylists, getOnePlaylist, updatePlaylist, deletePlaylist } from '../controllers/playlistsController.js';
import  {verifyToken}  from '../middleware/auth.js';

const router = express.Router();

router.post('/playlists',verifyToken, createPlaylist);
router.get('/playlists', getPlaylists);
router.get('/playlists/:id', getOnePlaylist);
router.put('/playlists/:id', updatePlaylist);
router.delete('/playlists/:id', deletePlaylist);

export default router;