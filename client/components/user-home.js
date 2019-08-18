import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  console.log(email)
  return (
    <div id="landing-page">
      {email ? (
        <h3>Welcome, {email}</h3>
      ) : (
        <Button as={Link} to="/login" color="green">
          Get Started
        </Button>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
