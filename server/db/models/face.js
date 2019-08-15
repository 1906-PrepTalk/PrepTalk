const Sequelize = require('sequelize')
const db = require('../db')

const Face = db.define('face', {
    data: {
        type: Sequelize.JSON
    }
})

module.exports = Face