import axios from 'axios'

// const defaultSession = {
//   apiKey: '',
//   token: '',
//   sessionId: ''
// }

const GOT_SESSION = 'GOT_SESSION'

const gotSession = session => {
  return {
    type: GOT_SESSION,
    session
  }
}

export const getSession = session => async dispatch => {
  try {
    const {data: sessionData} = await axios.get(`/api/faceRecording`, session)
    dispatch(gotSession(sessionData))
  } catch (error) {
    console.error(error)
  }
}

const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_SESSION:
      return {...action.session}
    default:
      return state
  }
}

export default sessionReducer
