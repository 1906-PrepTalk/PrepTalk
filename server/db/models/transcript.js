const Sequelize = require('sequelize')
const db = require('../db')

const Transcript = db.define('transcript', {
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Transcript