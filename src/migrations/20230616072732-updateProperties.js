'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    try{
      return Promise.all([
        queryInterface.changeColumn('properties', 'title', {
          type: Sequelize.STRING,
          allowNull: false
      }),
      queryInterface.changeColumn('properties', 'description', {
        type: Sequelize.STRING,
        allowNull: true
    }),
    queryInterface.changeColumn('properties', 'owner_identity', {
      type: Sequelize.STRING,
      allowNull: false
  })
      ])
    }catch(error)
    {
      console.log("error at 20230616072732-updateProperties.js",error)
    }
  },

  down: (queryInterface, Sequelize) => {
      
  }
};