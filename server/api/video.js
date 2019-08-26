const router = require('express').Router()
const {Video, User} = require('../db/models')

router.get('/videos/view/:userId', async (req, res, next) => {
  try {
    const videos = await Video.findAll({
      include: [
        {
          model: User,
          where: {
            id: req.params.userId
          }
        }
      ]
    })
    console.log('route videos', videos)
    res.send(videos)
  } catch (error) {
    console.error(error)
  }
})

router.get('/videos/:videoId', async (req, res, next) => {
  try {
    const video = await Video.findByPk(req.params.videoId)
    res.send(video)
  } catch (error) {
    console.error(error)
  }
})

router.post('/archive/', async (req, res, next) => {
  try {
    const video = await Video.findOne({
      where: {
        archiveId: req.body.archiveId
      }
    })
    console.log('video in route', video)
    if (!video) {
      await Video.create({
        userId: req.body.userId,
        archiveId: req.body.archiveId
      })
    } else {
      res.status(404).send('Video already exists!')
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
