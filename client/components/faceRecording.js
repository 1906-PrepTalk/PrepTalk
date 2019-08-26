import React from 'react'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'
import {connect} from 'react-redux'
import {getSession} from '../store/session'
import {getArchiveId, stopArchiving} from '../store/archiveId'
import {Link} from 'react-router-dom'
import {Button, Form} from 'semantic-ui-react'
import Questions from './questions'
import {getQuestion} from '../store/questionStore'

class FaceRecording extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      connection: 'Connecting',
      publishVideo: true,
      stoppedArchiving: false
    }

    this.sessionEventHandlers = {
      sessionConnected: () => {
        this.setState({connection: 'Connected'})
      },
      sessionDisconnected: () => {
        this.setState({connection: 'Disconnected'})
      },
      sessionReconnected: () => {
        this.setState({connection: 'Reconnected'})
      },
      sessionReconnecting: () => {
        this.setState({connection: 'Reconnecting'})
      }
    }

    this.publisherEventHandlers = {
      accessDenied: () => {
        console.log('User denied access to media source')
      },
      streamCreated: () => {
        console.log('Publisher stream created')
      },
      streamDestroyed: ({reason}) => {
        console.log(`Publisher stream destroyed because: ${reason}`)
      }
    }

    this.subscriberEventHandlers = {
      videoEnabled: () => {
        console.log('Subscriber video enabled')
      },
      videoDisabled: () => {
        console.log('Subscriber video disabled')
      }
    }
  }

  onSessionError = error => {
    this.setState({error})
  }

  onPublish = () => {
    console.log('Publish Success')
  }

  onPublishError = error => {
    this.setState({error})
  }

  onSubscribe = () => {
    console.log('Subscribe Success')
  }

  onSubscribeError = error => {
    this.setState({error})
  }

  toggleVideo = () => {
    this.setState(state => ({
      publishVideo: !state.publishVideo
    }))
  }

  // START RECORDING / STOP RECORDING

  startArchive = e => {
    e.preventDefault()
    try {
      this.props.getArchiveId(
        this.props.session.sessionId,
        e.target.recordingName.value
      )
    } catch (err) {
      console.log(err)
    }
  }

  stopArchive = e => {
    e.preventDefault()
    try {
      this.props.stopArchiving(this.props.archiveId)
      this.setState({stoppedArchiving: true})
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.props.getSession()
  }

  render() {
    const {apiKey, sessionId, token} = this.props.session
    const {error, connection, publishVideo} = this.state
    return Object.keys(this.props.session).length !== 0 ? (
      <div>
        <div id="sessionStatus">Session Status: {connection}</div>
        {error ? (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        ) : null}
        <OTSession
          apiKey={apiKey}
          sessionId={sessionId}
          token={token}
          onError={this.onSessionError}
          eventHandlers={this.sessionEventHandlers}
        >
          <Button id="videoButton" onClick={this.toggleVideo} type="button">
            {publishVideo ? 'Disable' : 'Enable'} Video
          </Button>

          <div className="startStopRecording">
            <Form onSubmit={this.startArchive}>
              <label>Name of Recording</label>
              <input
                placeholder="Recording Name"
                type="text"
                name="recordingName"
              />

              <Button id="startArchive" type="submit" primary>
                Start Recording
              </Button>

              {this.state.stoppedArchiving ? (
                <Button
                  as={Link}
                  to="/faceAnalysis"
                  id="viewArchive"
                  type="button"
                  color="green"
                >
                  See your video!
                </Button>
              ) : (
                <Button
                  id="stopArchive"
                  type="button"
                  onClick={this.stopArchive}
                  secondary
                >
                  Stop Recording
                </Button>
              )}
            </Form>
          </div>
          <div>
            <OTPublisher
              properties={{publishVideo, width: 800, height: 550}}
              onPublish={this.onPublish}
              onError={this.onPublishError}
              eventHandlers={this.publisherEventHandlers}
            />
            <OTStreams>
              <OTSubscriber
                properties={{width: 800, height: 550}}
                onSubscribe={this.onSubscribe}
                onError={this.onSubscribeError}
                eventHandlers={this.subscriberEventHandlers}
              />
            </OTStreams>
          </div>
        </OTSession>
        <Questions
          questions={this.props.questions}
          getQuestions={this.props.getQuestions}
        />
      </div>
    ) : (
      <h1 className="text-center">Loading...</h1>
    )
  }
}

const mapStateToProps = state => {
  return {
    session: state.session,
    archiveId: state.archiveId,
    questions: state.questions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSession: () => {
      dispatch(getSession())
    },
    getArchiveId: (archiveId, recordingName) =>
      dispatch(getArchiveId(archiveId, recordingName)),
    stopArchiving: archiveId => dispatch(stopArchiving(archiveId)),
    getQuestions: () => dispatch(getQuestion())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceRecording)
