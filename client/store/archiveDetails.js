import axios from 'axios'

// const defaultSession = {
//   apiKey: '',
//   token: '',
//   sessionId: ''
// }

// RECORD AND STOP ARCHIVING BUTTONS

const GOT_ARCHIVE_DETAILS = 'GOT_ARCHIVE_DETAILS'
const STOP_ARCHIVING = 'STOP_ARCHIVING'

const gotArchiveDetails = (archiveDetails, archiveName) => {
  return {
    type: GOT_ARCHIVE_DETAILS,
    archiveDetails,
    archiveName
  }
}

const stoppedArchiving = archiveId => {
  return {
    type: STOP_ARCHIVING,
    archiveId
  }
}

export const getArchiveDetails = (
  sessionId,
  recordingName
) => async dispatch => {
  try {
    const config = {
      name: recordingName,
      sessionId: sessionId,
      resolution: '1280x720',
      output: 'composed'
    }
    const {data} = await axios.post('/api/faceRecording/archive/start', config)
    dispatch(gotArchiveDetails(data.id, data.name))
  } catch (err) {
    console.log(err)
  }
}

export const stopArchiving = archiveId => async dispatch => {
  try {
    const {data} = await axios.post(
      `/api/faceRecording/archive/${archiveId}/stop`
    )
    console.log(data)
    dispatch(stoppedArchiving(data))
  } catch (err) {
    console.log(err)
  }
}

const initialState = {
  archiveId: '',
  archiveName: ''
}

const archiveIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ARCHIVE_DETAILS:
      return {
        ...state,
        archiveId: action.archiveDetails,
        archiveName: action.archiveName
      }
    default:
      return state
  }
}

export default archiveIdReducer
