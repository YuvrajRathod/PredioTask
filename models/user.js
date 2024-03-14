'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
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
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};