const speech = require('@google-cloud/speech')
// const {google} = require('googleapis')
const {Storage} = require('@google-cloud/storage')

let googCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS

const storage = new Storage(googCredentials)

function store(bucketId, filename) {
  const gbucket = storage.bucket(bucketId)
  return gbucket
    .file(filename)
    .createWriteStream()
    .on('error', err => {
      console.log(
        `Error uploading extracted audio to Google cloud storage. Reason: ${err}. File: ${filename}`
      )
    })
    .on('finish', () => {
      console.log(
        `Finished uploading extracted audio to Google cloud storage. File: ${filename}`
      )
    })
}

/**
 * Send audio to transcription service Google Cloud Speech API
 */
function transcribeAudio(googFilename) {
  try {
    const gclient = new speech.SpeechClient()
    return gclient
      .recognize({
        config: {
          encoding: 'LINEAR16',
          languageCode: 'en-US'
        },
        audio: {uri: googFilename}
      })
      .then(data => {
        console.log('This is data:', data)
        const res = data[0]
        console.log('This is res:', res)
        return res.promise()
      })
      .then(data => {
        const res = data[0]
        // const metadata = data[1]
        const transcript = res.results
          .map(r => {
            console.log(r.alternatives)
            return r.alternatives[0].transcript.trim()
          })
          .join('\n')
        return transcript
      })
      .catch(err => {
        console.log('This is googFileName', googFilename)
        console.log(`Error transcribing audio. Reason: ${err}`)
      })
  } catch (error) {
    console.error(error)
  }
}

// const transcribeAudio = async googFilename => {
//   console.log('googFilename', googFilename)
//   try {
//     const gclient = new speech.SpeechClient(googCredentials)
//     const config = {
//       encoding: 'LINEAR16',
//       languageCode: 'en-US'
//     }
//     const audio = {
//       uri: googFilename
//     }
//     const request = {
//       config: config,
//       audio: audio
//     }
//     // Detects speech in the audio file
//     const [response] = await gclient.recognize(request)
//     const transcription = response.results
//       .map(result => result.alternatives[0].transcript)
//       .join('\n')
//     console.log(`Transcription: `, transcription)
//     return transcription
//   } catch (error) {
//     console.error(error)
//   }
// }

// export
module.exports = {
  transcribeAudio,
  store
}
