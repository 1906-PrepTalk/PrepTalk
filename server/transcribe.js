const speech = require('@google-cloud/speech')

const {Storage} = require('@google-cloud/storage')
const storage = new Storage()

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
const transcribeAudio = async googFilename => {
  try {
    const gclient = new speech.SpeechClient()
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
    // Detects speech in the audio file
    const [response] = await gclient.recognize(request)
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n')
    console.log(`Transcription: `, transcription)
    return transcription
  } catch (error) {
    console.error(error)
  }
}

// export
module.exports = {
  transcribeAudio,
  store
}
