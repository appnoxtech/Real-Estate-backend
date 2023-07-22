import database from '../../../config/db'
import { DataTypes } from 'sequelize';
import { UUID, UUIDV4, STRING, DATE } from 'sequelize';

// Database connection instance
const databaseInstance = database;

// Sequelize Model
const Feedback = databaseInstance.define('Feedbacks', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type:DataTypes.STRING,
        allowNull:false
      },
    selectFeedback: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['I want to report a problem', 'I have a suggestion', 'I want to compliment 99acres','Other', 'Agricultural-property', 'Vacant-land', 'Mixed-use-property', 'Special-pupose-property', 'Real-estate-investment']
      },
    writeYourFeedback:{
         type:DataTypes.TEXT,
         allowNull:false
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

export default Feedback;