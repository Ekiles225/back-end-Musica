import { sequelize } from "../db/conexion.js";
import { DataTypes } from "sequelize";
import { PersonsModel } from "./PersonsModel.js";

export const playlistsModel = sequelize.define(
  "playlists",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
PersonsModel.hasMany(playlistsModel, { foreignKey: "person_id" });
playlistsModel.belongsTo(PersonsModel, { foreignKey: "person_id" });
