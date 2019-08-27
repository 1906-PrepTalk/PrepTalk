const router = require('express').Router()
const {Video, User} = require('../db/models')

// Post video
router.post('/', async (req, res, next) => {
  try {
    const video = await Video.findOne({
      where: {
        archiveId: req.body.archiveId
      }
    })
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

// Get all videos for specific user
router.get('/:userId', async (req, res, next) => {
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
    res.send(videos)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
