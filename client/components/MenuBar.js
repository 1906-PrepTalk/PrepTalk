import React from 'react'
import {Link} from 'react-router-dom'
import {Menu, Icon} from 'semantic-ui-react'

const MenuBar = props => {
  return props.isLoggedIn ? (
    <Menu fluid widths={3}>
      <Menu.Item as={Link} to="/" name="logout" onClick={props.handleClick}>
        {' '}
        <Icon name="sign-out" />
        Logout
      </Menu.Item>
      <Menu.Item as={Link} to="/myAccount" name="myAccount">
        {' '}
        <Icon name="user" />
        My Account
      </Menu.Item>
      <Menu.Item as={Link} to="/faceRecording" name="recordYourself">
        {' '}
        <Icon name="video camera" />
        Self Recording
      </Menu.Item>
    </Menu>
  ) : (
    ''
  )
}

export default MenuBar
