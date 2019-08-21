const OpenTok = require('opentok')

const API_KEY = process.env.OPENTOK_API_KEY
const SECRET = process.env.OPENTOK_SECRET

const opentok = new OpenTok(API_KEY, SECRET)

module.exports = opentok
