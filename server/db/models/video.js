const Sequelize = require('sequelize')
const db = require('../db')

const Video = db.define('video', {
  url: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isUrl: true
    }
  }
})

module.exports = Video
