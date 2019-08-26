import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Step, Icon} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const steps = [
  {
    key: 'signup',
    icon: 'user',
    title: 'Sign Up',
    description: 'Register for account or login if you have one'
  },
  {
    key: 'recordself',
    icon: 'video camera',
    title: 'Record Yourself',
    description: 'Assess your speaking ability with our recording software'
  },
  {
    key: 'confirm',
    icon: 'clipboard list',
    title: 'Facial Analysis',
    description: 'Get a facial analysis on your most frequent expressions'
  }
]

export const LandingPage = props => {
  const {email} = props
  return (
    <div id="landing-page">
      {email ? (
        <div className="title-screen">
          <h3>Welcome, {email}</h3>
        </div>
      ) : (
        <div className="title-screen">
          <h2>Need help to get that job or second interview? We can help.</h2>

          <Button as={Link} to="/login" color="green">
            Get Started
          </Button>
        </div>
      )}
      <Step.Group widths={3} className="steps">
        <Step>
          <Icon name="user" />
          <Step.Content>
            <Step.Title>Sign Up</Step.Title>
            <Step.Description>
              Register for account or login if you have one
            </Step.Description>
          </Step.Content>
        </Step>

        <Step>
          <Icon name="video camera" />
          <Step.Content>
            <Step.Title>Record Yourself</Step.Title>
            <Step.Description>
              Assess your speaking ability with our recording software
            </Step.Description>
          </Step.Content>
        </Step>

        <Step>
          <Icon name="clipboard list" />
          <Step.Content>
            <Step.Title>Facial Analysis</Step.Title>

            <Step.Description>
              Get a facial analysis on your most frequent expressions
            </Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>.
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
