import { sequelize } from '../db/conexion.js';
import { DataTypes } from 'sequelize';

export const userModels = sequelize.define('Users', {
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
      //no permitir valores nulos
      allowNull: false 
    },
    apellido: {
      type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
      },
    telefono: {
        type: DataTypes.STRING
    },
    pasword: {
        type: DataTypes.STRING
    }
  }, {
    // Para desactivar los campos createdAt y updatedAt que sequelize genera por defecto para cada modelo lo desactivamos de la siguiente línea de código
    timestamps: false
    //esto  la tabla usuario 
  });