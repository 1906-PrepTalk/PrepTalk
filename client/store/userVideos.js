import axios from 'axios'

// GETTING ARCHIVED VIDEO

const POSTED_VIDEO = 'POSTED_VIDEO'
const GOT_ALL_VIDEOS = 'GOT_ALL_VIDEOS'

// ACTION CREATORS

const postedVideo = (userId, archiveId, archiveName) => {
  return {
    type: POSTED_VIDEO,
    userId,
    archiveId,
    archiveName
  }
}

const gotAllVideos = videos => {
  return {
    type: GOT_ALL_VIDEOS,
    videos
  }
}

// Post video
export const postVideo = (userId, archiveId, archiveName) => async dispatch => {
  try {
    const {data: videoData} = await axios.post(`/api/recordings/`, {
      userId,
      archiveId,
      archiveName
    })
    dispatch(postedVideo(videoData))
  } catch (error) {
    console.error(error)
  }
}

// Get all videos for specific user
export const getAllVideos = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/recordings/${userId}`)
    dispatch(gotAllVideos(data))
  } catch (error) {
    console.error(error)
  }
}

const userVideoReducer = (state = {}, action) => {
  switch (action.type) {
    case POSTED_VIDEO:
      return action.archiveId
    case GOT_ALL_VIDEOS:
      return action.videos
    default:
      return state
  }
}

export default userVideoReducer
