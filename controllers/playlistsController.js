import { playlistsModel } from "../model/playlistsModel.js";
import { PersonsModel } from "../model/PersonsModel.js";
import { TOKEN_KEY } from "../config/config.js";
import jwt from "jsonwebtoken";

export const createPlaylist = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    // Validaciones de campos requeridos
    if (!nombre || !descripcion) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Extraer el token desde la cabecera
    const tokenHeader = req.header('Authorization');
    if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }
    
    const token = tokenHeader.split(' ')[1];
    const decoded = jwt.verify(token, TOKEN_KEY);

    // Extraer el person_id del token decodificado
    const person_id = decoded.person_id;

    if (!person_id) {
      return res.status(400).json({ message: "Invalid person_id" });
    }

    // Crear la playlist asociada al person_id
    const playList = await playlistsModel.create({
      nombre,
      descripcion,
      person_id, // Usar el person_id del token
    });

    res.status(201).json({ message: "Playlist created successfully", playList });
  } catch (error) {
    console.error("Error in createPlaylist:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Obtener todas las playlists
export const getPlaylists = async (req, res) => {
  try {
    const playlists = await playlistsModel.findAll({
      attributes: ['id', 'nombre', 'descripcion', 'person_id'],
      include: [
        {
          model: PersonsModel,
        }
      ]
    });
    res.status(200).json({ playlists });
  } catch (error) {
    console.error("Error in getPlaylists:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Obtener una playlist por ID
export const getOnePlaylist = async (req, res) => {
  try {
    const playlist = await playlistsModel.findOne({
      attributes: ['id', 'nombre', 'descripcion', 'likes_count', 'person_id'],
      where: { id: req.params.id },
      include: [
        {
          model: PersonsModel,
        }
      ]
    });
    if (!playlist) {
      res.status(404).json({ message: "Playlist not found" });
    } else {
      res.status(200).json({ playlist });
    }
  } catch (error) {
    console.error("Error in getOnePlaylist:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Actualizar una playlist
export const updatePlaylist = async (req, res) => {
  try {
    const { nombre, descripcion, likes_count, person_id } = req.body;
    const playlist = await PlaylistsModel.findOne({ where: { id: req.params.id } });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    playlist.nombre = nombre;
    playlist.descripcion = descripcion;
    playlist.likes_count = likes_count;
    playlist.person_id = person_id;
    await playlist.save();
    res.status(200).json(playlist);
  } catch (error) {
    console.error("Error in updatePlaylist:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Eliminar una playlist
export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await playlistsModel.findOne({ where: { id: req.params.id } });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    await playlist.destroy();
    res.status(200).json({ message: "Playlist deleted" });
  } catch (error) {
    console.error("Error in deletePlaylist:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};


