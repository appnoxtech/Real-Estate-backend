import database from '../../../config/db'
import { DataTypes} from 'sequelize';
import { UUID, UUIDV4, STRING, DATE } from 'sequelize';

// Database connection instance
const databaseInstance = database;

// Sequelize Model
const Properties = databaseInstance.define('properties', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type:DataTypes.STRING,
    allowNull:false
  },
  type: {
    type:DataTypes.ENUM,
    allowNull: false,
    values: ['Residential-property','Commertial-property','Industrial-property','Agricultural-property','Vacant-land','Mixed-use-property','Special-pupose-property','Real-estate-investment'],
    defaultValue: 'Residential-property',
  },
   description: {
     type: DataTypes.STRING,
     allowNull: true,
   },
   images: {
     type: DataTypes.STRING,
     allowNull: true,
   },
   location: {
     type: DataTypes.STRING,
     allowNull: false,
   },
   latitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },  
   area: {
     type: DataTypes.STRING,
     allowNull: false,
   },
   price:{
    type: DataTypes.STRING,
    allowNull: true,
   },
   bedrooms:{
     type: DataTypes.STRING,
     allowNull: true,
   },
   bathrooms:{
     type: DataTypes.STRING,
     allowNull: true,
   },
   amenities:{
     type: DataTypes.STRING,
     allowNull: true,
   },
   owner_identity:{
     type: DataTypes.STRING,
     allowNull: false,
   },
   status: {
    type:DataTypes.ENUM,
    allowNull: false,
    values: ['available','booked','rented'],
    defaultValue: 'available',
  },
  lookingTo:{
    type:DataTypes.ENUM,
    allowNull:false,
    values: ['Buy','Rent/Lease']
  },
  readyToMove:{
    type: DataTypes.ENUM,
    allowNull: false,
    values: ['Yes','No']
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

export default Properties;