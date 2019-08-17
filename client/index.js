import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

// function renderApp(credentials) {
//   ReactDOM.render(
//     <Provider store={store}>
//       <Router history={history}>
//         <App credentials={credentials} />
//       </Router>
//     </Provider>,
//     document.getElementById('app')
//   )
// }

// if (API_KEY && TOKEN && SESSION_ID) {
//   renderApp({
//     apiKey: API_KEY,
//     sessionId: SESSION_ID,
//     token: TOKEN
//   })
// } else {
//   fetch('http://localhost:8080/session')
//     .then(data => data.json())
//     .then(renderApp)
//     .catch(err => {
//       console.error('Failed to get session credentials', err)
//       alert(
//         'Failed to get opentok sessionId and token. Make sure you have updated the config.js file.'
//       )
//     })
// }
