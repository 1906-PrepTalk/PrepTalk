import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import MenuBar from './MenuBar'

const Navbar = (props, {handleClick, isLoggedIn}) => (
  <div>
    <Link to="/">
      <img src="PrepTalkLogo.png" />
    </Link>
    <nav>
      <div>
        {/* The navbar will show these links after you log in */}
        <MenuBar
          handleClick={props.handleClick}
          isLoggedIn={props.isLoggedIn}
        />
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
