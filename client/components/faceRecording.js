import React from 'react'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'
// import axios from 'axios'
import {connect} from 'react-redux'
import {getSession} from '../store/session'
import Axios from 'axios'

class FaceRecording extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      connection: 'Connecting',
      publishVideo: true,
      archiveId: null
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

  startArchive = e => {
    e.preventDefault()
    Axios.post('/api/faceRecording/archive/start', {
      sessionId: this.props.session.sessionId,
      resolution: '1280x720',
      output: 'composed'
    })
      .then(res => {
        this.setState({archiveId: res.data.id})
      })
      .then(() => console.log('Recording Started'))
      .catch(error => {
        console.error(error)
      })
  }

  stopArchive = e => {
    e.preventDefault()
    Axios.post(`/api/faceRecording/archive/${this.state.archiveId}/stop`)
      .then(() => console.log('Recording Stopped'))
      .catch(error => {
        console.error(error)
      })
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
          <button id="videoButton" onClick={this.toggleVideo} type="button">
            {publishVideo ? 'Disable' : 'Enable'} Video
          </button>
          <button id="startArchive" type="button" onClick={this.startArchive}>
            Start Recording
          </button>
          <button id="stopArchive" type="button" onClick={this.stopArchive}>
            Stop Recording
          </button>
          <OTPublisher
            properties={{publishVideo, width: 850, height: 850}}
            onPublish={this.onPublish}
            onError={this.onPublishError}
            eventHandlers={this.publisherEventHandlers}
          />
          <OTStreams>
            <OTSubscriber
              properties={{width: 850, height: 850}}
              onSubscribe={this.onSubscribe}
              onError={this.onSubscribeError}
              eventHandlers={this.subscriberEventHandlers}
            />
          </OTStreams>
        </OTSession>
      </div>
    ) : (
      <h1 className="text-center">Loading...</h1>
    )
  }
}

const mapStateToProps = state => {
  return {
    session: state.session
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSession: () => {
      dispatch(getSession())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceRecording)
