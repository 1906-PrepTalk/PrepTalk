import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getArchivedVideo} from '../store/archivedVideo'

class FaceAnalysis extends Component {
  componentDidMount() {
    // this.props.getArchivedVideo(this.props.archiveId)
    this.props.getArchivedVideo('ffd8a84e-419f-4158-9141-cb536832810d')
  }

  // componentWillMount(){

  // }

  render() {
    console.log(this.props)
    return (
      <div>
        <h2>Review Video Here!</h2>
        {this.props.archivedVideoUrl ? (
          <video controls width="720">
            <source src={this.props.archivedVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <h1>Loading...</h1>
        )}
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
    getArchivedVideo: archiveId => dispatch(getArchivedVideo(archiveId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceAnalysis)
