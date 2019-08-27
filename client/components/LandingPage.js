import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Transition} from 'semantic-ui-react'
import LandingPageSteps from './LandingPageSteps'

/**
 * COMPONENT
 */

class LandingPage extends Component {
  constructor() {
    super()

    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    this.setState({visible: true})
  }
  render() {
    const {email} = this.props
    return (
      <Transition visible={this.state.visible} duration={1000}>
        <div id="landing-page">
          {email ? (
            <div className="title-screen">
              <h1>Paving the way for your new career</h1>
              <h2>
                It all starts with constant practice. Follow our steps below to
                get started.
              </h2>
            </div>
          ) : (
            <div className="title-screen">
              <h2>
                Need help to get that job or second interview? We can help.
              </h2>

              <Button as={Link} to="/login" color="green">
                Get Started
              </Button>
            </div>
          )}
          <div className="stickySteps">
            <LandingPageSteps />
          </div>
        </div>
      </Transition>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState, null)(LandingPage)

/**
 * PROP TYPES
 */
LandingPage.propTypes = {
  email: PropTypes.string
}
