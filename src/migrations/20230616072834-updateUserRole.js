'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    try{
      return Promise.all([
        queryInterface.changeColumn('users', 'role', {  
          type:Sequelize.ENUM,
          allowNull: false,
          values: ['admin','owner','tenant','broker','buyer'],
          defaultValue: 'tenant',
  
      }),
      ])
    }catch(error)
    {
      console.log("error at 20230616072732-updateUserRole.js",error)
    }
  },

  down: (queryInterface, Sequelize) => {
      
  }
};