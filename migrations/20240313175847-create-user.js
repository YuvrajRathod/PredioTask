'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      studentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false,
        validate:{
          notNull:{msg:'Student must have a ID'},
          notEmpty:{msg:'ID must not be empty'}
        }
      },
      studentName: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Student must have a Name'},
          notEmpty:{msg:'Name must not be empty'}
        }
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
          notNull:{msg:'Student must have a age'},
          notEmpty:{msg:'Age must not be empty'}
        }
      },
      dob: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Student must have a DOB'},
          notEmpty:{msg:'DOB must not be empty'}
        }
  
      },
      className: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notNull:{msg:'Student must have a Class'},
          notEmpty:{msg:'Class must not be empty'}
        }
  
      },
      subjectsList: {
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
          notNull:{msg:'Student must have a Subjects'},
          notEmpty:{msg:'Subjects must not be empty'}
        }
  
      },
      subjectsMarks: {
        type:DataTypes.TEXT,
      
  
      },
      subjectsGrade: {
        type:DataTypes.TEXT,
     
  
      },
      subjectsPer: {
        type:DataTypes.TEXT,
  
  
      },
      overallGrade: {
        type:DataTypes.STRING,
      },
      overallPer: {
        type:DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users');
  }
};