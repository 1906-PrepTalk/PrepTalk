import axios from 'axios'

const GOT_FACEDATA = 'GOT_FACEDATA'
const POSTED_FACEDATA = 'POSTED_FACEDATA'
const GOT_ARCHIVED_VIDEO = 'GOT_ARCHIVED_VIDEO'

const gotFaceData = faceData => {
  return {
    type: GOT_FACEDATA,
    faceData
  }
}
const postedFaceData = faceData => {
  return {
    type: POSTED_FACEDATA,
    faceData
  }
}
const gotArchivedVideo = videoUrl => {
  return {
    type: GOT_ARCHIVED_VIDEO,
    videoUrl
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
export const getArchivedVideo = archiveId => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/faceAnalysis/archive/${archiveId}/view`
    )
    dispatch(gotArchivedVideo(data))
  } catch (err) {
    console.log(err)
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case GOT_FACEDATA:
      return action.faceData
    case POSTED_FACEDATA:
      return action.faceData
    case GOT_ARCHIVED_VIDEO:
      console.log('action in face thunk', action)
      return action
    default:
      return state
  }
}
