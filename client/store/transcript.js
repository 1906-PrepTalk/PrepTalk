import axios from 'axios'

const GOT_TRANSCRIPT = 'GOT_TRANSCRIPT'

const gotTranscript = transcript => {
  return {
    type: 'GOT_TRANSCRIPT',
    transcript
  }
}

export const getTranscript = archiveId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/transcript/${archiveId}`)
    dispatch(gotTranscript(data))
  } catch (error) {
    console.error(error)
  }
}

const transcriptReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_TRANSCRIPT:
      return action.transcript
    default:
      return state
  }
}

export default transcriptReducer
