import axios from 'axios'

// const defaultSession = {
//   apiKey: '',
//   token: '',
//   sessionId: ''
// }

const GOT_SESSION = 'GOT_SESSION'

const gotSession = session => ({GOT_SESSION, session})

export const getSession = session => async dispatch => {
  console.log('getSession')
  try {
    const {data: sessionData} = await axios.get(`/api/room/${session}`)
    console.log('sessionData', sessionData)
    dispatch(gotSession(sessionData))
  } catch (error) {
    console.error(error)
  }
}

const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_SESSION:
      console.log('action', action)
      return {...state.session, session: action.session}
    default:
      return state
  }
}

export default sessionReducer
