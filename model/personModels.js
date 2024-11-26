import { sequelize } from '../db/conexion.js';
import { DataTypes } from 'sequelize';

export const personModels = sequelize.define('person', {
    // Los atributos del modelo se definen aquí
    id: {
      //tipo de dato
      type: DataTypes.INTEGER,
      //autoincremento
      autoIncrement: true,
      //clave primaria 
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING, 
      allowNull: true 
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: true 
      },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cedula: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    foto:{
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    // Para desactivar los campos createdAt y updatedAt que sequelize genera por defecto para cada modelo lo desactivamos de la siguiente línea de código
    timestamps: false
    //esto  la tabla usuario 
  });