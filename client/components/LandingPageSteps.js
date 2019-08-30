import React from 'react'
import {Step, Icon} from 'semantic-ui-react'

const LandingPageSteps = props => {
  return (
    <Step.Group widths={4} className="steps">
      <Step>
        <Icon name="user" />
        <Step.Content>
          <Step.Title>Sign Up</Step.Title>
          <Step.Description>
            Register for an account or login if you have one.
          </Step.Description>
        </Step.Content>
      </Step>

      <Step>
        <Icon name="video camera" />
        <Step.Content>
          <Step.Title>Record Yourself</Step.Title>
          <Step.Description>
            Assess your speaking ability with our recording software.
          </Step.Description>
        </Step.Content>
      </Step>

      <Step>
        <Icon name="comment" />
        <Step.Content>
          <Step.Title>Interview Questions</Step.Title>

          <Step.Description>
            Answer some common interview questions to gauge your nerves.
          </Step.Description>
        </Step.Content>
      </Step>

      <Step>
        <Icon name="clipboard list" />
        <Step.Content>
          <Step.Title>Facial Analysis</Step.Title>

          <Step.Description>
            View your facial analysis on your most frequent expressions.
          </Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>
  )
}

export default LandingPageSteps
