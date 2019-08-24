const speech = require('@google-cloud/speech')
let googCredentials

if (
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON &&
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON.length > 1
) {
  googCredentials = {
    credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
  }
}

const {Storage} = require('@google-cloud/storage')
const storage = new Storage(googCredentials)

function store(bucketId, filename) {
  const gbucket = storage.bucket(bucketId)
  console.log('location bucket here', gbucket)
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
// function transcribeAudio(googFilename) {
//   try {
//     console.log(
//       'goooooooooooooooooooooooooooooooooooooooooooooooog',
//       googFilename
//     )
//     const gclient = new speech.SpeechClient(googCredentials)
//     console.log('Here are the', googCredentials)
//     return gclient
//       .recognize({
//         config: {
//           encoding: 'LINEAR16',
//           languageCode: 'en-US'
//         },
//         audio: {uri: googFilename}
//       })
//       .then(() =>
//         console.log(
//           'config audio=================================',
//           this.config.audio
//         )
//       )
//       .then(data => {
//         console.log('This is data:', data)
//         const res = data[0]
//         console.log('This is res:', res)
//         return res.promise()
//       })
//       .then(data => {
//         const res = data[0]
//         // const metadata = data[1]
//         const transcript = res.results
//           .map(r => {
//             console.log(r.alternatives)
//             return r.alternatives[0].transcript.trim()
//           })
//           .join('\n')
//         return transcript
//       })
//       .catch(err => {
//         console.log('This is googFileName', googFilename)
//         // ERROR HERE, ERROR HERE, ERROR HERE, ERROR HERE, ERROR HERE
//         console.log(`Error transcribing audio. Reason: ${err}`)
//       })
//   } catch (error) {
//     console.error(error)
//   }
// }

const transcribeAudio = async googFilename => {
  try {
    const gclient = new speech.SpeechClient(googCredentials)
    const config = {
      encoding: 'LINEAR16',
      languageCode: 'en-US'
    }
    const audio = {
      uri: googFilename
    }
    const request = {
      config: config,
      audio: audio
    }
    console.log(
      '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Error Happens After Here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
    )
    // Detects speech in the audio file
    const [response] = await gclient.recognize(request)
    console.log(
      '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Error Happens Before Here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
    )
    console.log('response', response)
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n')
    console.log(`Transcription: `, transcription)
  } catch (error) {
    console.error(error)
  }
}

// export
module.exports = {
  transcribeAudio,
  store
}
