const Sequelize = require('sequelize')
const db = require('../db')

const Video = db.define('video', {
  archiveId: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Video
