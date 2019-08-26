import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getArchivedVideo} from '../store/video'
import {getFacialEmotions} from '../../server/api/faceApi'
import {postFaceData} from '../store/face'
import FacialDataReport from './FacialDataReport'

class FaceAnalysis extends Component {
  constructor() {
    super()

    this.handlePlay = this.handlePlay.bind(this)
  }

  componentDidMount() {
    this.props.getArchivedVideo(this.props.archiveId)
  }

  handlePlay = async event => {
    const faceData = await getFacialEmotions(event.target)
    this.props.postFaceData(this.props.archiveId, faceData.expressions)
  }

  render() {
    console.log('this.props.archiveId', this.props.archiveId)
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
        <FacialDataReport />
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
    getArchivedVideo: archiveId => dispatch(getArchivedVideo(archiveId)),
    postFaceData: (archiveId, expressions) =>
      dispatch(postFaceData(archiveId, expressions))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceAnalysis)
