import * as faceapi from 'face-api.js'

// Face API Recognition

export async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
  await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
  await faceapi.nets.faceExpressionNet.loadFromUri('/models')
}

export async function getFacialEmotions(input) {
  await loadModels()
  let detectFace = await faceapi
    .detectSingleFace(
      input,
      new faceapi.TinyFaceDetectorOptions({inputSize: 320})
    )
    .withFaceExpressions()
  console.log(detectFace)
  console.log(
    '<========================================= finished ===========================================>'
  )
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
