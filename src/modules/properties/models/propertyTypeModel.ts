import database from '../../../config/db'
import { DataTypes} from 'sequelize';
import { UUID, UUIDV4, STRING, DATE } from 'sequelize';

// Database connection instance
const databaseInstance = database;

// Sequelize Model
const PropertiesType = databaseInstance.define('propertyTypes', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type:DataTypes.STRING,
    allowNull:false
  },
  type: {
    type:DataTypes.STRING,
    allowNull: true,
  },
  // createdAt, lastUpdatedAt and deletedAt managed by Sequelize
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
}, {
  // Auto-create timestamps
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  // Enable soft deletes
  //   paranoid: true,
});

export default PropertiesType;