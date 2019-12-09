import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button, Divider, Form, Grid, Segment} from 'semantic-ui-react'

const AuthForm = props => {
  const {handleSubmit} = props
  return (
    <div id="login-signup-form">
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form onSubmit={handleSubmit} name="login">
              <h2>Login</h2>
              <Form.Input
                icon="user"
                iconPosition="left"
                label="Email"
                placeholder="email"
                name="email"
                type="text"
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Password"
                name="password"
                type="password"
              />
              <div className="LoginGoogleButtons">
                <Button content="Login" primary />
                <Button
                  as="a"
                  href="/auth/google"
                  role="link"
                  color="red"
                  icon="google"
                />
              </div>
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Form onSubmit={handleSubmit} name="signup">
              <h2>Sign Up</h2>
              <Form.Input
                icon="user"
                iconPosition="left"
                label="Email"
                placeholder="Email"
                name="email"
                type="text"
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Password"
                name="password"
                type="password"
              />

              <Button content="Sign up" secondary />
            </Form>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(null, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}
