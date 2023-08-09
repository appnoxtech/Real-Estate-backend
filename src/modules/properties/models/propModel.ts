import database from '../../../config/db'
import { DataTypes} from 'sequelize';
import { UUID, UUIDV4, STRING, DATE } from 'sequelize';

// Database connection instance
const databaseInstance = database;

// DataTypes Model
const Properties = databaseInstance.define('properties', {
 
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
    allowNull: false
    },
    propertyType: {
      type: DataTypes.JSON,
      allowNull: false,
    defaultValue:[]
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
    defaultValue:[]
    },
    location: {
      type: DataTypes.JSON,
      allowNull: false,
    defaultValue:[]
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ["Commercial-property", "Residential-property"],
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bhk: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amenities: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ownerPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lookingTo: {
      type: DataTypes.ENUM,
      allowNull: false,
    values: ['Buy', 'Rent/Lease','PG']
    },
    furnishedStatus: {
      type: DataTypes.ENUM,
      allowNull: false,
    values: ['unfurnished', 'semi-furnished', 'fully-furnished'],
    defaultValue: 'unfurnished',
    },
  totalFloor:{
    type:DataTypes.STRING,
    allowNull:true
    },
  propertyOnFloor:{
    type:DataTypes.STRING,
    allowNull:true
    },
  ageOfProperty:{
    type:DataTypes.STRING,
    allowNull:true
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
    values: ['readyToMove','underConstruction']
    },
  parking:{
     type:DataTypes.ENUM,
     allowNull:true,
     values:['Yes','No']
    },
    // createdAt, lastUpdatedAt and deletedAt managed by DataTypes
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
  }
}, {
    // Auto-create timestamps
    timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
    // Enable soft deletes
    //   paranoid: true,
});

export default Properties;