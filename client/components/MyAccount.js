import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserAccountInfo from './UserAccountInfo'

class MyAccount extends Component {
  render() {
    return (
      <div id="userPage">
        <h2>Welcome, {this.props.user.email}</h2>
        <UserAccountInfo user={this.props.user} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)
