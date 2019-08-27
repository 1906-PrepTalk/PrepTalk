import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFacialEmotions} from '../../server/api/faceApi'
import {postFaceData, getVideoUrl} from '../store/face'
import FacialDataReport from './FacialDataReport'

class FaceAnalysis extends Component {
  constructor() {
    super()

    this.handlePlay = this.handlePlay.bind(this)
  }

  componentDidMount() {
    const {archiveId} = this.props.match.params
    this.props.getVideoUrl(archiveId)
  }

  handlePlay = async e => {
    e.preventDefault()
    console.log('handlePlay this.props', this.props)
    const {archiveId} = this.props.match.params
    const video = this.props.videos.find(v => v.archiveId === archiveId)
    const faceData = await getFacialEmotions(e.target)
    console.log('faceData expressions', faceData.expression)
    this.props.postFaceData(video.id, faceData.expressions)
  }

  render() {
    return this.props.videoUrl !== 'undefined' ? (
      <div id="facialAnalysis">
        <h2>Facial Analysis Results</h2>
        <video
          id="video"
          controls
          width="720"
          onPlay={this.handlePlay}
          src={this.props.videoUrl}
          type="video/mp4"
          crossOrigin="anonymous"
        />
        {/* <FacialDataReport archiveId={this.props.match.params.archiveId} /> */}
      </div>
    ) : (
      <h1 className="text-center">Loading...</h1>
    )
  }
}

const mapStateToProps = state => {
  return {
    videoUrl: state.faceData.videoUrl,
    videos: state.videos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getVideoUrl: archiveId => dispatch(getVideoUrl(archiveId)),
    postFaceData: (archiveId, expressions) =>
      dispatch(postFaceData(archiveId, expressions))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceAnalysis)
