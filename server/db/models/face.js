const Sequelize = require('sequelize')
const db = require('../db')

const Face = db.define('face', {
  angry: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
      max: 1,
      min: 0,
      notEmpty: true
    }
  },
  disgusted: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
      max: 1,
      min: 0,
      notEmpty: true
    }
  },
  fearful: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
      max: 1,
      min: 0,
      notEmpty: true
    }
  },
  happy: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
      max: 1,
      min: 0,
      notEmpty: true
    }
  },
  neutral: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
      max: 1,
      min: 0,
      notEmpty: true
    }
  },
  sad: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
      max: 1,
      min: 0,
      notEmpty: true
    }
  },
  surprised: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
      max: 1,
      min: 0,
      notEmpty: true
    }
  }
})

module.exports = Face
