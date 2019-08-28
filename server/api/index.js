const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/faceRecording', require('./opentok'))
router.use('/transcript', require('./transcript'))
router.use('/questions', require('./questionRoute'))
// new Routes

router.use('/faceAnalysis', require('./facialAnalysisVideo'))
router.use('/recordings', require('./userRecordings'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
