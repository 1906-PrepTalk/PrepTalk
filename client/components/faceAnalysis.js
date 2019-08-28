import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getArchivedVideo} from '../store/archivedVideo'
import {getFaceData, postFaceData} from '../store/faceData'
import {getFacialEmotions} from '../../server/api/faceApi'
import {getAllVideos} from '../store/userVideos'
import DonutPosition from './DonutPosition'

class FaceAnalysis extends Component {
  constructor() {
    super()

    this.handlePlay = this.handlePlay.bind(this)
  }

  componentDidMount() {
    // if (this.props.match.params.archiveId) {
    this.props.getArchivedVideo(this.props.match.params.archiveId)
    this.props.getAllVideos(this.props.userId)
    // } else {
    //   this.props.getArchivedVideo(this.props.archiveId)
    // }
  }

  handlePlay = async event => {
    const faceData = await getFacialEmotions(event.target)
    console.log(faceData)
    const {archiveId} = this.props.match.params
    if (archiveId) {
      const video = this.props.videos.find(v => v.archiveId === archiveId)
      this.props.postFaceData(video.id, faceData.expressions)
      this.props.getFaceData(archiveId)
    }
  }

  render() {
    return this.props.archivedVideoUrl !== 'undefined' ? (
      <div>
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
        </div>

        <div id="donutChart">
          {this.props.faceData[0] ? (
            <DonutPosition
              //Add facial expressions data into props for DonutPosition component
              // data={[`angry: ${(this.props.faceData[0].angry * 100).toFixed(2)}`,
              // `disgusted: ${(this.props.faceData[0].disgusted * 100).toFixed(2)}`,
              // `fearful: ${(this.props.faceData[0].fearful * 100).toFixed(2)}`,
              // `happy: ${(this.props.faceData[0].happy * 100).toFixed(2)}`,
              // `neutral: ${(this.props.faceData[0].neutral * 100).toFixed(2)}`,
              // `sad: ${(this.props.faceData[0].sad * 100).toFixed(2)}`,
              // `surprised: ${(this.props.faceData[0].surprised * 100).toFixed(2)}`]}
              data={[
                this.props.faceData[0].angry,
                this.props.faceData[0].disgusted,
                this.props.faceData[0].fearful,
                this.props.faceData[0].happy,
                this.props.faceData[0].neutral,
                this.props.faceData[0].sad,
                this.props.faceData[0].surprised
              ]}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    ) : (
      <h1> Loading... </h1>
    )
  }
}

const mapStateToProps = state => {
  return {
    archivedVideoUrl: state.archivedVideo,
    archiveId: state.archiveDetails.archiveId,
    expressions: state.expressions,
    faceData: state.faceData,
    videos: state.userVideo,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getArchivedVideo: archiveId => dispatch(getArchivedVideo(archiveId)),
    getFaceData: archiveId => dispatch(getFaceData(archiveId)),
    postFaceData: (videoId, expressions) =>
      dispatch(postFaceData(videoId, expressions)),
    getAllVideos: userId => dispatch(getAllVideos(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceAnalysis)
