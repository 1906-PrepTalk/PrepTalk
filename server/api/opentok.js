const router = require('express').Router()
const {API_KEY, SECRET} = require('../../secrets')
const _ = require('lodash')
const path = require('path')

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

const OpenTok = require('opentok')
const opentok = new OpenTok(API_KEY, SECRET)

// let roomToSessionIdDictionary = {}

// const findRoomFromSessionId = sessionId => {
//   return _.findKey(roomToSessionIdDictionary, function(value) {
//     return value === sessionId
//   })
// }

// router.get('/session', (req, res, next) => {
//   console.log('test get route for faceRecording')
//   res.redirect('/room/session')
// })

router.get('/', (req, res, next) => {
  console.log(opentok)
  //   const roomName = req.params.name
  let sessionId
  let token
  opentok.createSession({mediaMode: 'routed', archiveMode: 'always'}, function(
    error,
    session
  ) {
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
  //   token = await opentok.generateToken(sessionId)

  //   if (roomToSessionIdDictionary[roomName]) {
  //     sessionId = roomToSessionIdDictionary[roomName]
  //     console.log('test')
  //     // generate token

  //   }

  //   else {
  //     // Create a session that will attempt to transmit streams directly between
  //     // clients. If clients cannot connect, the session uses the OpenTok TURN server:
  //     opentok.createSession({mediaMode: 'relayed'}, function(err, session) {
  //       if (err) {
  //         console.log(err)
  //         res.status(500).send({error: 'createSession error:', err})
  //         return
  //       }

  //       roomToSessionIdDictionary[roomName] = session.sessionId

  //       // generate token
  //       token = opentok.generateToken(session.sessionId)
  //       res.setHeader('Content-Type', 'application/json')
  //       res.send({
  //         apiKey: API_KEY,
  //         sessionId,
  //         token
  //       })
  //     })
  //   }
})

/**
 * POST /archive/start
 */
router.post('/archive/start', function(req, res) {
  console.log('testing route')
  var json = req.body
  var sessionId = json.sessionId
  console.log(sessionId)
  opentok.startArchive(sessionId, {name: 'Important Presentation'}, function(
    err,
    archive
  ) {
    if (err) {
      console.error('error in startArchive')
      console.error(err)
      res.status(500).send({error: 'startArchive error:' + err})
      return
    }
    res.setHeader('Content-Type', 'application/json')
    res.send(archive)
  })
})

/**
 * POST /archive/:archiveId/stop
 */
router.post('/archive/:archiveId/stop', function(req, res) {
  var archiveId = req.params.archiveId
  console.log('attempting to stop archive: ' + archiveId)
  opentok.stopArchive(archiveId, function(err, archive) {
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

/**
 * GET /archive/:archiveId/view
 */
router.get('/archive/:archiveId/view', function(req, res) {
  var archiveId = req.params.archiveId
  console.log('attempting to view archive: ' + archiveId)
  opentok.getArchive(archiveId, function(err, archive) {
    if (err) {
      console.error('error in getArchive')
      console.error(err)
      res.status(500).send({error: 'getArchive error:' + err})
      return
    }

    if (archive.status === 'available') {
      res.redirect(archive.url)
    } else {
      res.render('view', {title: 'Archiving Pending'})
    }
  })
})

/**
 * GET /archive/:archiveId
 */
router.get('/archive/:archiveId', function(req, res) {
  var archiveId = req.params.archiveId

  // fetch archive
  console.log('attempting to fetch archive: ' + archiveId)
  opentok.getArchive(archiveId, function(err, archive) {
    if (err) {
      console.error('error in getArchive')
      console.error(err)
      res.status(500).send({error: 'getArchive error:' + err})
      return
    }

    // extract as a JSON object
    res.setHeader('Content-Type', 'application/json')
    res.send(archive)
  })
})

/**
 * GET /archive
 */
router.get('/archive', function(req, res) {
  var options = {}
  if (req.query.count) {
    options.count = req.query.count
  }
  if (req.query.offset) {
    options.offset = req.query.offset
  }

  // list archives
  console.log('attempting to list archives')
  opentok.listArchives(options, function(err, archives) {
    if (err) {
      console.error('error in listArchives')
      console.error(err)
      res.status(500).send({error: 'infoArchive error:' + err})
      return
    }

    // extract as a JSON object
    res.setHeader('Content-Type', 'application/json')
    res.send(archives)
  })
})

module.exports = router
