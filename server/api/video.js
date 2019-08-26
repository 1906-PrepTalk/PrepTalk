const router = require('express').Router()
const {Video} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const videos = await Video.findAll(req.params.userId)
    res.send(videos)
  } catch (error) {
    console.error(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const video = await Video.findOrCreate({
      where: {
        videoId: req.body.videoId
      }
    })
    res.send(video)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
