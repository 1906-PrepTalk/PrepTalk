import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllVideos} from '../store/video'

class UserVideos extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log('user videos---------------------------------', this.props)
    if (this.props.userId) {
      this.props.getAllVideos(this.props.userId)
    }
  }

  selectVideo = videoId => {
    this.props.history.push(`/faceRecording/videos/${videoId}`)
  }

  render() {
    console.log('user videos props', this.props)
    return (
      <div>
        {this.props.videos &&
          this.props.videos.map(video => (
            <div key={video.id}>
              <p>{video.name}</p>
              <button onClick={() => this.selectVideo(video.id)} type="button">
                Select Video
              </button>
            </div>
          ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    videos: state.videos,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllVideos: userId => dispatch(getAllVideos(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserVideos)
