import axios from 'axios'

// GETTING ARCHIVED VIDEO

const GOT_ARCHIVED_VIDEO = 'GOT_ARCHIVED_VIDEO'

// ACTION CREATORS

const gotArchivedVideo = videoUrl => {
  return {
    type: GOT_ARCHIVED_VIDEO,
    videoUrl
  }
}

export const getArchivedVideo = archiveId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/faceAnalysis/video/${archiveId}`)
    dispatch(gotArchivedVideo(data))
  } catch (err) {
    console.log(err)
  }
}

const archivedVideoReducer = (state = '', action) => {
  switch (action.type) {
    case GOT_ARCHIVED_VIDEO:
      return action.videoUrl
    default:
      return state
  }
}

export default archivedVideoReducer
