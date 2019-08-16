import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = props => {
  return (
    <div>
      <Navbar />
      <Routes credentials={props.credentials} />
    </div>
  )
}

export default App
