import axios from 'axios'

const GOT_FACEDATA = 'GOT_FACEDATA'

const gotFaceData = expressions => ({
  type: GOT_FACEDATA,
  expressions
})

export const getFaceData = archiveId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/faceAnalysis/${archiveId}`)
    dispatch(gotFaceData(data))
  } catch (error) {
    console.error(error)
  }
}

const faceDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_FACEDATA:
      return action.expressions
    default:
      return state
  }
}

export default faceDataReducer
