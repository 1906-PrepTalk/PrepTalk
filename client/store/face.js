import axios from 'axios'

const GOT_FACEDATA = 'GOT_FACEDATA'
const POSTED_FACEDATA = 'POSTED_FACEDATA'
const GOT_VIDEO_URL = 'GOT_VIDEO_URL'

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

const gotVideoUrl = videoUrl => {
  return {
    type: GOT_VIDEO_URL,
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

// Gets video URL through S3
export const getVideoUrl = archiveId => async dispatch => {
  try {
    const {data: videoUrl} = await axios.get(
      `/api/faceAnalysis/video/${archiveId}`
    )
    dispatch(gotVideoUrl(videoUrl))
  } catch (err) {
    console.log(err)
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case GOT_FACEDATA:
      return action.expressions
    case POSTED_FACEDATA:
      return action.faceData
    case GOT_VIDEO_URL:
      return {...state, videoUrl: action.videoUrl}
    default:
      return state
  }
}
