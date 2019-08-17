import React from 'react'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'
// import axios from 'axios'
import {connect} from 'react-redux'
import {getSession} from '../store/session'

class FaceRecording extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      connection: 'Connecting',
      publishVideo: true
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

  // recordSession = async () => {
  //   console.log(this.props.credentials)

  //   const header = {
  //     iss: this.props.credentials.apiKey,
  //     ist: 'project',
  //     iat: Math.floor(Date.now() / 1000),
  //     exp: Math.floor(Date.now() / 1000) + 300,
  //     jti: 'jwt_nonce'
  //   }

  //   const data = {
  //     sessionId: this.props.credentials.sessionId,
  //     hasAudio: true,
  //     hasVideo: true,
  //     layout: {
  //       type: 'custom',
  //       stylesheet: 'the layout stylesheet (only used with type == custom)'
  //     },
  //     name: 'archive_name',
  //     outputMode: 'composed',
  //     resolution: '640x480'
  //   }

  //   await axios.post(
  //     `https://api.opentok.com/v2/project/${
  //       this.props.credentials.apiKey
  //     }/archive`,
  //     data,
  //     header
  //   )
  // }

  render() {
    console.log(this)
    const session = this.props.params.match.id
    this.props.getSession(session)

    const {apiKey, sessionId, token} = this.props.credentials
    const {error, connection, publishVideo} = this.state

    return (
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
          <button id="recordButton" type="button" onClick={this.recordSession}>
            Record
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
    )
  }
}

const mapStateToProps = state => {
  console.log('testing mstp', state)
  return {
    credentials: state.session
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
