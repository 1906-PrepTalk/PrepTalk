import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllVideos} from '../store/video'

class UserVideos extends Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.getAllVideos(this.props.userId)
    }
  }

  selectVideo = archiveId => {
    this.props.history.push(`/faceAnalysis/video/${archiveId}`)
  }

  render() {
    return this.props.videos.length > 0 ? (
      <div>
        {this.props.videos.map(video => (
          <div key={video.id}>
            <p>{video.archiveId}</p>
            <button
              onClick={() => this.selectVideo(video.archiveId)}
              type="button"
            >
              Select Video
            </button>
          </div>
        ))}
      </div>
    ) : (
      <h1 className="text-center">Loading...</h1>
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
