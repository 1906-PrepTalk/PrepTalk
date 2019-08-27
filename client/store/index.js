import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import session from './session'
import archiveId from './archiveId'
import videos from './video'
import faceData from './face'
import questions from './questionStore'

const reducer = combineReducers({
  user,
  session,
  archiveId,
  videos,
  faceData,
  questions
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
