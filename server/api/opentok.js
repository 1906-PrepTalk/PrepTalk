const router = require('express').Router()
// const {API_KEY, SECRET} = require('../../secrets')
// const _ = require('lodash')
const path = require('path')
const opentok = require('./opentokInstance')
const aws = require('aws-sdk')

const API_KEY = process.env.OPENTOK_API_KEY
const SECRET = process.env.OPENTOK_SECRET

if (!API_KEY || !SECRET) {
  console.error(
    '========================================================================================================='
  )
  console.error('')
  console.error('Missing TOKBOX_API_KEY or TOKBOX_SECRET')
  console.error(
    'Find the appropriate values for these by logging into your TokBox Dashboard at: https://tokbox.com/account/#/'
  )
  console.error(
    'Then add them to ',
    path.resolve('.env'),
    'or as environment variables'
  )
  console.error('')
  console.error(
    '========================================================================================================='
  )
  process.exit()
}

router.get('/', (req, res, next) => {
  let sessionId
  let token
  opentok.createSession({mediaMode: 'routed'}, function(error, session) {
    if (error) {
      console.log('Error creating session:', error)
    } else {
      sessionId = session.sessionId
      token = opentok.generateToken(sessionId)
      res.setHeader('Content-Type', 'application/json')
      res.send({
        apiKey: API_KEY,
        sessionId,
        token
      })
    }
  })
})

/**
 * POST /archive/start
 */
router.post('/archive/start', function(req, res) {
  const {name, sessionId, resolution, outputMode} = req.body
  console.log(
    '<=============================================== start archive ===============================================>'
  )
  opentok.startArchive(
    sessionId,
    {name, resolution, outputMode},
    (err, archive) => {
      if (err) {
        console.error('error in startArchive')
        console.error(err)
        res.status(500).send({error: 'startArchive error:' + err})
        return
      }
      res.setHeader('Content-Type', 'application/json')
      res.send(archive)
    }
  )
})

/**
 * POST /archive/:archiveId/stop
 */
router.post('/archive/:archiveId/stop', function(req, res) {
  console.log(
    '<=============================================== stop archive ===============================================>'
  )
  const archiveId = req.params.archiveId
  console.log('attempting to stop archive: ' + archiveId)
  opentok.stopArchive(archiveId, (err, archive) => {
    if (err) {
      console.error('error in stopArchive')
      console.error(err)
      res.status(500).send({error: 'stopArchive error:' + err})
      return
    }
    res.setHeader('Content-Type', 'application/json')
    res.send(archive)
  })
})

module.exports = router
