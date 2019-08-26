import axios from 'axios'

// GETTING ARCHIVED VIDEO

const GOT_ARCHIVED_VIDEO = 'GOT_ARCHIVED_VIDEO'
const POSTED_VIDEO = 'POSTED_VIDEO'
const GOT_ALL_VIDEOS = 'GOT_ALL_VIDEOS'

// ACTION CREATORS

const gotArchivedVideo = videoUrl => {
  return {
    type: GOT_ARCHIVED_VIDEO,
    videoUrl
  }
}

const postedVideo = videoUrl => {
  return {
    type: POSTED_VIDEO,
    videoUrl
  }
}

const gotAllVideos = userId => {
  return {
    type: GOT_ALL_VIDEOS,
    userId
  }
}

export const getArchivedVideo = archiveId => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/faceRecording/archive/${archiveId}/view`
    )
    dispatch(gotArchivedVideo(data))
  } catch (err) {
    console.log(err)
  }
}

export const postVideo = videoUrl => async dispatch => {
  try {
    const {data} = await axios.post(`/api/faceRecording/archive/`, videoUrl)
    dispatch(postedVideo(data))
  } catch (error) {
    console.error(error)
  }
}

export const getAllVideos = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/faceRecording/archive/${userId}`)
    dispatch(gotAllVideos(data))
  } catch (error) {
    console.error(error)
  }
}

const videoReducer = (state = '', action) => {
  switch (action.type) {
    case GOT_ARCHIVED_VIDEO:
      return action.videoUrl
    case POSTED_VIDEO:
      return action.videoUrl
    case GOT_ALL_VIDEOS:
      return action.videos
    default:
      return state
  }
}

export default videoReducer
