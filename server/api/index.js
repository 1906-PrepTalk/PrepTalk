const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/faceRecording', require('./opentok'))
router.use('/transcript', require('./transcript'))
router.use('/faceAnalysis', require('./face'))
router.use('/faceRecording', require('./video'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
