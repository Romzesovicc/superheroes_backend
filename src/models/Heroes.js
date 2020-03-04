import { DataTypes } from 'sequelize';

const SCHEMA = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nickName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  realName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  originDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  superpowers: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  catchPhrase: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  images: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

export default {
  schema: SCHEMA,
  tableName: 'heroes',
};
