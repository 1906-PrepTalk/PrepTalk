import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'
/**
 * COMPONENT
 */
export const LandingPage = props => {
  const {email} = props
  return (
    <div id="landing-page">
      {email ? (
        <div>
          <h3>Welcome, {email}</h3>
        </div>
      ) : (
        <div id="title-screen">
          <h2>Need help to get that job or second interview? We can help.</h2>

          <Button as={Link} to="/login" color="green">
            Get Started
          </Button>
        </div>
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

export default connect(mapState)(LandingPage)

/**
 * PROP TYPES
 */
LandingPage.propTypes = {
  email: PropTypes.string
}
