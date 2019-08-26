import React from 'react'
import {Link} from 'react-router-dom'
import {Menu, Icon} from 'semantic-ui-react'

const MenuBar = props => {
  return props.isLoggedIn ? (
    <Menu fluid widths={5}>
      <Menu.Item as={Link} to="/myAccount" name="myAccount">
        {' '}
        <Icon name="user" />
        My Account
      </Menu.Item>
      <Menu.Item as={Link} to="/" name="logout" onClick={props.handleClick}>
        {' '}
        <Icon name="sign-out" />
        Logout
      </Menu.Item>
      <Menu.Item as={Link} to="/faceRecording" name="recordYourself">
        {' '}
        <Icon name="video camera" />
        Self Recording
      </Menu.Item>
      <Menu.Item as={Link} to="/faceAnalysis" name="faceAnalysis">
        {' '}
        <Icon name="video camera" />
        Facial Analysis
      </Menu.Item>
      <Menu.Item as={Link} to="/faceRecording/videos" name="recordings">
        {' '}
        <Icon name="video camera" />
        Recordings
      </Menu.Item>
    </Menu>
  ) : (
    ''
  )
}

export default MenuBar
