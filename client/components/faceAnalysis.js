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
      button: false,
      angry: '',
      happy: '',
      sad: '',
      disgusted: '',
      surprised: '',
      fearful: '',
      neutral: ''
    }
    this.displayButton = this.displayButton.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.getFaceData = this.getFaceData.bind(this)
    this.testFaceData = this.testFaceData.bind(this)
  }

  componentDidMount() {
    const {archiveId} = this.props.match.params
    this.setState({button: true})
    // this.props.getArchivedVideo(archiveId)
    this.props.getAllVideos(this.props.userId)
    this.props.getTranscript(archiveId)
    this.props.getFaceData(archiveId)
  }

  handlePlay = async event => {
    const faceData = await getFacialEmotions(event.target)
    const {archiveId} = this.props.match.params
    const video = this.props.videos.find(v => v.archiveId === archiveId)
    this.props.postFaceData(video.id, faceData.expressions)
  }

  displayButton() {
    this.setState({button: true})
  }

  getFaceData() {
    const {archiveId} = this.props.match.params
    this.props.getFaceData(archiveId)
    this.setState({button: false})
    setTimeout(this.testFaceData, 2000)
  }

  testFaceData() {
    let faceData = this.props.faceData
    const angry =
      faceData.map(word => Number(word.angry)).reduce((a, b) => a + b) /
      faceData.length
    const happy =
      faceData.map(word => Number(word.happy)).reduce((a, b) => a + b) /
      faceData.length
    const surprised =
      faceData.map(word => Number(word.surprised)).reduce((a, b) => a + b) /
      faceData.length
    const sad =
      faceData.map(word => Number(word.sad)).reduce((a, b) => a + b) /
      faceData.length
    const disgusted =
      faceData.map(word => Number(word.disgusted)).reduce((a, b) => a + b) /
      faceData.length
    const fearful =
      faceData.map(word => Number(word.fearful)).reduce((a, b) => a + b) /
      faceData.length
    const neutral =
      faceData.map(word => Number(word.neutral)).reduce((a, b) => a + b) /
      faceData.length
    console.log(`angry: ${angry * 100},
      happy: ${happy * 100},
      surprised: ${surprised * 100},
      sad: ${sad * 100},
      disgusted: ${disgusted * 100},
      fearful: ${fearful * 100},
      neutral: ${neutral * 100}`)
    this.setState({
      angry: angry,
      happy: happy,
      surprised: surprised,
      sad: sad,
      disgusted: disgusted,
      fearful: fearful,
      neutral: neutral
    })
  }

  render() {
    return this.props.archivedVideoUrl !== 'undefined' ? (
      <div>
        <div>
          <div id="facialAnalysis">
            <h2>Facial Analysis Results</h2>

            <video
              id="video"
              controls
              width="900"
              onEnded={this.displayButton}
              onTimeUpdate={this.handlePlay}
              src={this.props.archivedVideoUrl}
              type="video/mp4"
              crossOrigin="anonymous"
              preload="auto"
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
          </div>
          <div className="container">
            {typeof this.state.angry === 'number' ? (
              <div>
                <h2>Facial Expressions</h2>
                <DonutPosition
                  data={[
                    (this.state.angry * 100).toFixed(2),
                    (this.state.disgusted * 100).toFixed(2),
                    (this.state.fearful * 100).toFixed(2),
                    (this.state.happy * 100).toFixed(2),
                    (this.state.neutral * 100).toFixed(2),
                    (this.state.sad * 100).toFixed(2),
                    (this.state.surprised * 100).toFixed(2)
                  ].filter(data => data > 1)}
                />
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="container">
            {Object.keys(this.props.transcript).length > 0 ? (
              <div>
                <h2>Frequently Used Words</h2>
                <WordCloud transcript={this.props.transcript.data} />
              </div>
            ) : (
              ''
            )}
          </div>
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
