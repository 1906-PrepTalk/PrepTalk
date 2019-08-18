import React from 'react'
import {Link} from 'react-router-dom'
import {Menu, Button} from 'semantic-ui-react'

const MenuBar = props => {
  return props.isLoggedIn ? (
    <Menu>
      <Menu.Item as={Link} to="/" name="logout" onClick={props.handleClick}>
        Logout
      </Menu.Item>
      <Menu.Item as={Link} to="/faceRecording" name="recordYourself">
        Self Recording
      </Menu.Item>
      <Menu.Item as={Link} to="/oneOnOne" name="oneOnOne">
        One on One Prep
      </Menu.Item>
      <Menu.Item as={Link} to="/groupPrep" name="joinExistingRoom">
        Group Preparation
      </Menu.Item>
    </Menu>
  ) : (
    ''
  )
}

export default MenuBar
