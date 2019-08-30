import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserAccountInfo from './UserAccountInfo'
import {getAllVideos} from '../store/userVideos'
import {
  updateAccountName,
  updateAccountEmail,
  updateAccountOccupation
} from '../store/updateUserInfo'

class MyAccount extends Component {
  constructor() {
    super()

    this.updateName = this.updateName.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updateOccupation = this.updateOccupation.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.getAllVideos(this.props.user.id)
    }
  }

  selectVideo = archiveId => {
    this.props.history.push(`/faceAnalysis/video/${archiveId}`)
  }

  updateName(event) {
    event.preventDefault()
    this.props.updateAccountName(this.props.user.id, event.target.name.value)
  }

  updateEmail(event) {
    event.preventDefault()
    this.props.updateAccountEmail(this.props.user.id, event.target.email.value)
  }

  updateOccupation(event) {
    event.preventDefault()
    this.props.updateAccountOccupation(
      this.props.user.id,
      event.target.occupation.value
    )
  }

  render() {
    return (
      <div id="userPage">
        <h2>Welcome, {this.props.user.email}</h2>
        <UserAccountInfo
          user={this.props.user}
          videos={this.props.videos}
          selectVideo={this.selectVideo}
          updateName={this.updateName}
          updateEmail={this.updateEmail}
          updateOccupation={this.updateOccupation}
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
    getAllVideos: userId => dispatch(getAllVideos(userId)),
    updateAccountName: (userId, info) =>
      dispatch(updateAccountName(userId, info)),
    updateAccountEmail: (userId, info) =>
      dispatch(updateAccountEmail(userId, info)),
    updateAccountOccupation: (userId, info) =>
      dispatch(updateAccountOccupation(userId, info))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)
