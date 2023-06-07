import database from '../../../config/db'
import { DataTypes} from 'sequelize';
import { UUID, UUIDV4, STRING, DATE } from 'sequelize';

// Database connection instance
const databaseInstance = database;

// Sequelize Model
const User = databaseInstance.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  token: {
    type:DataTypes.STRING,
    allowNull:true
  },
  name: {
    type:DataTypes.STRING,
    allowNull: false,
  },
  profilePhoto: {
    type:DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type:DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type:DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: true,
   },
  isPhoneVerified:{
    type:DataTypes.BOOLEAN,
    allowNull:true
   },
  role: {
    type:DataTypes.ENUM,
    allowNull: false,
    values: ['admin','landlord','tenant'],
    defaultValue: 'tenant',
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

export default User;