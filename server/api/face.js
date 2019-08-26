const router = require('express').Router()
const {Face} = require('../db/models')
const aws = require('aws-sdk')

router.get('/archive/:archiveId/view', async (req, res, next) => {
  try {
    aws.config.region = 'us-east-1'
    aws.config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
    const archiveId = req.params.archiveId
    const s3 = new aws.S3()
    const video = await Face.findAll({
      where: {
        archiveId: archiveId
      }
    })
    const options = {
      Bucket: 'preptalk2',
      Key: `46407582/${archiveId}/archive.mp4`
    }
    s3.getSignedUrl('getObject', options, function(err, url) {
      if (err) {
        console.log(err)
      } else {
        console.log('The URL is ', url)
        res.set('Content-Type', 'video/mp4')
        res.send({url, video})
      }
    })
  } catch (error) {
    console.error(error)
  }
})

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

router.post('/:archiveId', async (req, res, next) => {
  try {
    const faceData = await Face.findOne({
      where: {
        archiveId: req.params.archiveId
      }
    })
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
