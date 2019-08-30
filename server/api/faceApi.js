import * as faceapi from 'face-api.js'

// Face API Recognition

export async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
  await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
  await faceapi.nets.faceExpressionNet.loadFromUri('/models')
}

export async function getFacialEmotions(input) {
  await loadModels()
  let detectFace = await faceapi
    .detectSingleFace(input, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions()
  return detectFace
}
