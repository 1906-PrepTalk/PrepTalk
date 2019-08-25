import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getArchivedVideo} from '../store/archivedVideo'
import {getFacialEmotions} from '../../server/api/faceApi'

class FaceAnalysis extends Component {
  constructor() {
    super()

    this.handlePlay = this.handlePlay.bind(this)
  }

  componentDidMount() {
    // this.props.getArchivedVideo(this.props.archiveId)
    // this.props.getArchivedVideo('4a485767-9e83-41f0-a78a-e37ba7f67194')
    this.props.getArchivedVideo('faceapitest')
  }

  // async componentWillMount() {
  //   await loadModels()
  // }

  handlePlay(event) {
    //   console.log(event.target.currentSrc)
    getFacialEmotions(event.target)
  }

  render() {
    return (
      <div>
        <h2>Review Video Here!</h2>
        <video
          id="video"
          controls
          width="720"
          onPlay={this.handlePlay}
          src={this.props.archivedVideoUrl}
          type="video/mp4"
          crossOrigin="anonymous"
        />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    archivedVideoUrl: state.archivedVideo,
    archiveId: state.archiveId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getArchivedVideo: archiveId => dispatch(getArchivedVideo(archiveId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceAnalysis)
