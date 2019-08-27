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
  render() {
    console.log(this.props)
    return (
      <div id="userPage">
        <h2>Welcome, {this.props.user.email}</h2>
        <UserAccountInfo user={this.props.user} videos={this.props.videos} />
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
