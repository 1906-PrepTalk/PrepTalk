import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getArchivedVideo} from '../store/archivedVideo'
import {getFaceData, postFaceData} from '../store/faceData'
import {getFacialEmotions} from '../../server/api/faceApi'
import {getAllVideos} from '../store/userVideos'
import DonutPosition from './DonutPosition'
import {Button} from 'semantic-ui-react'
import {getTranscript} from '../store/transcript'
import WordCloud from './WordCloud'

class FaceAnalysis extends Component {
  constructor() {
    super()
    this.state = {
      button: false
    }
    this.displayButton = this.displayButton.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.getFaceData = this.getFaceData.bind(this)
  }

  componentDidMount() {
    // if (this.props.match.params.archiveId) {
    const {archiveId} = this.props.match.params
    this.props.getArchivedVideo(this.props.match.params.archiveId)
    this.props.getAllVideos(this.props.userId)
    this.props.getTranscript(archiveId)
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
      // this.props.getFaceData(archiveId)
    }
  }

  displayButton() {
    this.setState({button: true})
  }

  getFaceData() {
    const {archiveId} = this.props.match.params
    this.props.getFaceData(archiveId)
    this.setState({button: false})
  }

  render() {
    return this.props.archivedVideoUrl !== 'undefined' ? (
      <div>
        <div id="facialAnalysis">
          <h2>Facial Analysis Results</h2>
          <p>{this.props.transcript.data}</p>
          <WordCloud />
          <video
            id="video"
            controls
            width="720"
            onEnded={this.displayButton}
            onPlay={this.handlePlay}
            src={this.props.archivedVideoUrl}
            type="video/mp4"
            crossOrigin="anonymous"
          />

          {this.state.button ? (
            <Button
              type="button"
              onClick={this.getFaceData}
              color="yellow"
              className="getFaceDataButton"
            >
              Get Face Data
            </Button>
          ) : (
            ''
          )}

          {this.props.faceData[0] ? (
            <DonutPosition
              data={[
                (this.props.faceData[0].angry * 100).toFixed(2),
                (this.props.faceData[0].disgusted * 100).toFixed(2),
                (this.props.faceData[0].fearful * 100).toFixed(2),
                (this.props.faceData[0].happy * 100).toFixed(2),
                (this.props.faceData[0].neutral * 100).toFixed(2),
                (this.props.faceData[0].sad * 100).toFixed(2),
                (this.props.faceData[0].surprised * 100).toFixed(2)
              ].filter(data => data > 1)}
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
    userId: state.user.id,
    transcript: state.transcript
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getArchivedVideo: archiveId => dispatch(getArchivedVideo(archiveId)),
    getFaceData: archiveId => dispatch(getFaceData(archiveId)),
    postFaceData: (videoId, expressions) =>
      dispatch(postFaceData(videoId, expressions)),
    getAllVideos: userId => dispatch(getAllVideos(userId)),
    getTranscript: archiveId => dispatch(getTranscript(archiveId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceAnalysis)
