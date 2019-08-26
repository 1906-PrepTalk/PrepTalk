import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {getArchivedVideo} from '../store/video'
import {getFacialEmotions} from '../../server/api/faceApi'
import {postFaceData, getArchivedVideo} from '../store/face'
import FacialDataReport from './FacialDataReport'

class FaceAnalysis extends Component {
  constructor() {
    super()

    this.handlePlay = this.handlePlay.bind(this)
  }

  componentDidMount() {
    const {archiveId} = this.props.match.params
    console.log('archiveId', archiveId)
    console.log('this.props', this.props)
    this.props.getArchivedVideo(archiveId)
  }

  handlePlay = async event => {
    const faceData = await getFacialEmotions(event.target)
    this.props.postFaceData(this.props.archiveId, faceData.expressions)
  }

  render() {
    return (
      <div id="facialAnalysis">
        <h2>Facial Analysis Results</h2>
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
    archiveId: state.archiveId,
    videoUrl: state.videoUrl,
    videoId: state.videoId
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
