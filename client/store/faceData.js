import axios from 'axios'

const GOT_FACEDATA = 'GOT_FACEDATA'
const POSTED_FACEDATA = 'POSTED_FACEDATA'

const gotFaceData = expressions => {
  return {
    type: GOT_FACEDATA,
    expressions
  }
}
const postedFaceData = faceData => {
  return {
    type: POSTED_FACEDATA,
    faceData
  }
}

export const getFaceData = videoId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/faceAnalysis/${videoId}`)
    dispatch(gotFaceData(data))
  } catch (error) {
    console.error(error)
  }
}

export const postFaceData = (videoId, expressions) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/faceAnalysis/${videoId}`, expressions)
    dispatch(postedFaceData(data))
  } catch (error) {
    console.error(error)
  }
}

const faceDataReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_FACEDATA:
      return action.expressions
    case POSTED_FACEDATA:
      return action.faceData
    default:
      return state
  }
}

export default faceDataReducer
