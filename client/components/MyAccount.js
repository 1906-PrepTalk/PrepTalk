import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserAccountInfo from './UserAccountInfo'
import {getAllVideos} from '../store/userVideos'

class MyAccount extends Component {
  componentDidMount() {
    if (this.props.user.id) {
      this.props.getAllVideos(this.props.user.id)
    }
  }

  selectVideo = archiveId => {
    this.props.history.push(`/faceAnalysis/video/${archiveId}`)
  }
  render() {
    return (
      <div id="userPage">
        <h2>Welcome, {this.props.user.email}</h2>
        <UserAccountInfo
          user={this.props.user}
          videos={this.props.videos}
          selectVideo={this.selectVideo}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    videos: state.userVideo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllVideos: userId => dispatch(getAllVideos(userId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)
