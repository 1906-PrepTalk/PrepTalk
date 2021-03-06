const router = require('express').Router()
const {Face, Video} = require('../db/models')

const aws = require('aws-sdk')

// Gets video URL through S3
router.get('/video/:archiveId', (req, res, next) => {
  try {
    aws.config.region = 'us-east-1'
    aws.config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
    const archiveId = req.params.archiveId
    const s3 = new aws.S3()
    const options = {
      Bucket: 'preptalk3',
      Key: `46407582/${archiveId}/archive.mp4`
    }
    s3.getSignedUrl('getObject', options, function(err, url) {
      if (err) {
        console.log(err)
      } else {
        console.log('The URL is ', url)
        res.set('Content-Type', 'video/mp4')
        res.send(url)
      }
    })
  } catch (error) {
    console.error(error)
  }
})

router.get('/:archiveId', async (req, res, next) => {
  try {
    const faceData = await Face.findAll({
      include: [
        {
          model: Video,
          where: {
            archiveId: req.params.archiveId
          }
        }
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

module.exports = router
