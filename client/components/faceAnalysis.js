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
      showGraph: false,
      button: false,
      called: 0,
      angry: 0,
      happy: 0,
      sad: 0,
      disgusted: 0,
      surprised: 0,
      fearful: 0,
      neutral: 0
    }
    this.displayButton = this.displayButton.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.getFaceData = this.getFaceData.bind(this)
    this.resetData = this.resetData.bind(this)
  }

  componentDidMount() {
    const {archiveId} = this.props.match.params
    this.props.getArchivedVideo(archiveId)
    this.props.getAllVideos(this.props.userId)
    this.props.getTranscript(archiveId)
  }

  resetData() {
    this.setState({
      called: 0,
      angry: 0,
      happy: 0,
      sad: 0,
      disgusted: 0,
      surprised: 0,
      fearful: 0,
      neutral: 0,
      showGraph: false
    })
  }

  handlePlay = async event => {
    const faceData = await getFacialEmotions(event.target)
    console.log(faceData)

    this.state.angry += faceData.expressions.angry
    this.state.happy += faceData.expressions.happy
    this.state.sad += faceData.expressions.sad
    this.state.disgusted += faceData.expressions.disgusted
    this.state.surprised += faceData.expressions.surprised
    this.state.fearful += faceData.expressions.fearful
    this.state.neutral += faceData.expressions.neutral
    this.state.called++

    // const {archiveId} = this.props.match.params
    // const video = this.props.videos.find(v => v.archiveId === archiveId)
    // this.props.postFaceData(video.id, faceData.expressions)
  }

  displayButton() {
    this.setState({button: true})
  }

  getFaceData() {
    const expressions = this.state

    const angry = expressions.angry / expressions.called

    const happy = expressions.happy / expressions.called

    const surprised = expressions.surprised / expressions.called

    const sad = expressions.sad / expressions.called

    const disgusted = expressions.disgusted / expressions.called

    const fearful = expressions.fearful / expressions.called

    const neutral = expressions.neutral / expressions.called

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
      neutral: neutral,
      button: false,
      showGraph: true
    })
  }

  render() {
    return this.props.archivedVideoUrl !== 'undefined' ? (
      <div>
        <div id="facialAnalysis">
          <video
            id="video"
            controls
            width="900"
            onPlay={this.resetData}
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

        {/* <div className="container">
          {this.state.showGraph ? (
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
        </div> */}

        <div className="container">
          {this.state.showGraph ? (
            <div>
              <h2>Facial Analysis Data</h2>
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

          {this.state.showGraph ? (
            <div>
              <h2>Frequently Used Words</h2>
              <WordCloud transcript={this.props.transcript.data} />
            </div>
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
