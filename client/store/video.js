import axios from 'axios'
import history from '../history'

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

const postedVideo = (userId, archiveId) => {
  return {
    type: POSTED_VIDEO,
    userId,
    archiveId
  }
}

const gotAllVideos = videos => {
  return {
    type: GOT_ALL_VIDEOS,
    videos
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

export const postVideo = (userId, archiveId) => async dispatch => {
  try {
    console.log('postVideo thunk archiveId', archiveId, 'userId', userId)
    const {data} = await axios.post(`/api/faceRecording/archive/`, {
      userId,
      archiveId
    })
    console.log('postVideo thunk data', data)
    dispatch(postedVideo(data))
    history.push('/faceRecording/videos')
  } catch (error) {
    console.error(error)
  }
}

export const getAllVideos = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/faceRecording/videos/view/${userId}`)
    console.log('thunk data', data)
    dispatch(gotAllVideos(data))
  } catch (error) {
    console.error(error)
  }
}

const videoReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_ARCHIVED_VIDEO:
      return action.videoUrl
    case POSTED_VIDEO:
      return action.archiveId
    case GOT_ALL_VIDEOS:
      console.log('action got all videos', action)
      return {...state.videos, videos: action.videos}
    default:
      return state
  }
}

export default videoReducer
