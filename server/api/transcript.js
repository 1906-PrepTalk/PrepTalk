const router = require('express').Router()
// const Opentok = require('opentok')
const opentok = require('./opentokInstance')

const Archive = require('../archive')
// const OPENTOK_SECRET = process.env.OPENTOK_SECRET

const CONFIG = {}

const reqEnvVars = [
  ['PORT', 8080],
  ['OPENTOK_API_KEY'],
  ['AWS_S3_BUCKET_NAME'],
  ['AWS_ACCESS_KEY_ID'],
  ['AWS_SECRET_ACCESS_KEY'],
  ['GOOGLE_STORAGE_BUCKET'],
  ['GOOGLE_APPLICATION_CREDENTIALS', 'google-credentials-heroku.json'],
  ['GOOGLE_APPLICATION_CREDENTIALS_JSON', 0]
]

for (const ev of reqEnvVars) {
  if (ev[1] === null && !process.env[ev[0]]) {
    console.log(`Need environment variable ${ev[0]}`)
    process.exit(1)
  }
  CONFIG[ev[0]] = process.env[ev[0]] || ev[1]
}

console.log(
  '<=========================================================================================================== CONFIG OBJECT ===========================================================================================================>',
  CONFIG
)

// const opentok = new Opentok(CONFIG.OPENTOK_API_KEY, OPENTOK_SECRET)
const archive = new Archive(CONFIG, opentok)

router.post('/ot_callback', (req, res) => {
  if (req.body.id) {
    console.log(
      `Archive id ${req.body.id} ${req.body.status} (mode: ${
        req.body.outputMode
      })`
    )
  }
  if (req.body.status === 'uploaded') {
    archive.processArchive(req.body).catch(err => {
      console.log(`Error processing new archive upload. Reason: ${err}`)
    })
  }
  res.status(200).send()
})

router.get('/', (req, res, next) => {
  archive
    .listAvailableTranscripts()
    .then(data => {
      res.status(200).json({
        message: 'Available Transcripts',
        payload: data
      })
    })
    .catch(err => {
      next(err)
    })
})

/**
 * Get transcript metadata for given archive from S3
 */

router.get('/metadata/:archiveId', (req, res, next) => {
  archive
    .getTranscriptMetadata(req.params.archiveId)
    .then(data => {
      res.status(200).json({
        message: 'Transcript Metadata',
        payload: data
      })
    })
    .catch(err => {
      err.status = err.statusCode
      next(err)
    })
})

/**
 * Get the actual text of transcription for a given archive and its stream ID.
 */

router.get('/:archiveId/:streamId.txt', (req, res, next) => {
  const streamId = req.params.streamId || 'transcript'
  const archiveId = req.params.archiveId
  archive
    .getTranscript(archiveId, streamId)
    .then(data => {
      res.type('text/plain')
      res.status(200).send(data)
    })
    .catch(err => {
      err.status = err.statusCode
      next(err)
    })
})

/**
 * Delete archive by archive ID
 */
router.delete('/archives/:id', (req, res, next) => {
  opentok.deleteArchive(req.params.id, function(err) {
    if (err) {
      console.log(`Error deleting archive ${req.params.id}. Reason: ${err}`)
      next(err)
      return
    }
    console.log(`Deleted archive ${req.params.id}`)
    res.status(200).json({
      message: 'Archive deleted',
      payload: {
        id: req.params.id
      }
    })
  })
})

module.exports = router
