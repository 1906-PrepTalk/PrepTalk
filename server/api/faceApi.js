import * as faceapi from 'face-api.js'

// Face API Recognition

export async function loadModels() {
  const MODEL_URL = '../../models'
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL)
  await faceapi.loadFaceRecognitionModel(MODEL_URL)
}

export async function getFacialEmotions() {
  let detectFace = await faceapi
    .detectSingleFace()
    .withFaceLandmarks(true)
    .withFaceDescriptor()

  return detectFace
}

// AWS grabbing functions

// export function downloadArchiveFromS3(archiveId) {
//     const params = {
//       Bucket: "preptalk",
//       Key: `${process.env.OPENTOK_API_KEY}/${archiveId}/archive.mp4`
//     }

//     return this.s3
//       .getObject(params)
//       .createReadStream()
//   }
