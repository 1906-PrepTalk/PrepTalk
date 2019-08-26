const router = require('express').Router()
const {Face} = require('../db/models')

router.get('/:videoId', async (req, res, next) => {
  try {
    const faceData = await Face.findByPk(req.params.videoId, {
      attributes: [
        'angry',
        'disgusted',
        'fearful',
        'happy',
        'neutral',
        'sad',
        'surprised'
      ]
    })
    if (!faceData) {
      res.sendStatus(404)
    } else {
      res.status(200).send(faceData)
    }
  } catch (error) {
    console.error(error)
  }
})

router.post('/:videoId', async (req, res, next) => {
  try {
    const faceData = await Face.findByPk(req.params.videoId)
    if (!faceData) {
      const newFaceData = await Face.create({
        angry: req.body.angry,
        disgusted: req.body.disgusted,
        fearful: req.body.fearful,
        happy: req.body.happy,
        neutral: req.body.neutral,
        sad: req.body.sad,
        surprised: req.body.surprised
      })
      res.status(201).json(newFaceData)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
