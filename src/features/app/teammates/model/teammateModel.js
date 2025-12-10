import { DataTypes } from "sequelize";
import sequelize from "../../../../config/database.js";

const Teammate = sequelize.define(
  "Teammate",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "teammates",
  }
);

export { Teammate };
