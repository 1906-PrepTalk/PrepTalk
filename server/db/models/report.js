const Sequelize = require('sequelize')
const db = require('../db')

const Report = db.define('report', {
  speechAnalysis: {
    type: Sequelize.TEXT
  },
  faceAnalysis: {
    type: Sequelize.TEXT
  }
})

module.exports = Report

//graph data, copy of transcript, recommendations
