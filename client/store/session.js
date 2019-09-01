import axios from 'axios'

const GOT_SESSION = 'GOT_SESSION'

const gotSession = session => {
  return {
    type: GOT_SESSION,
    session
  }
}

export const getSession = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/faceRecording`)
    dispatch(gotSession(data))
  } catch (error) {
    console.error(error)
  }
}

const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_SESSION:
      return action.session
    default:
      return state
  }
}

export default sessionReducer
