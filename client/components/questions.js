import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getQuestion} from '../store/questionStore'

/**
 * COMPONENT
 */
export default class Questions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: ''
    }
    this.randomQuestions = this.randomQuestions.bind(this)
  }

  componentDidMount() {
    this.props.getQuestions()
  }

  randomQuestions = () => {
    if (this.props.questions) {
      this.setState({
        question: this.props.questions[
          Math.floor(Math.random() * this.props.questions.length)
        ].question
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h3 className="text-center">Ready? Let's get started!</h3>
        <button type="button" onClick={this.randomQuestions}>
          {' '}
          Ask me A Question
        </button>
        <h3>{this.state.question}</h3>
      </div>
    )
  }
}

// const mapState = state => {
//     return {
//         questions: state.question
//     }
// }

// const mapDispatch = dispatch => {
//     return {
//         getQuestion: () => dispatch(getQuestion())
//     }
// }

// export default connect(mapState, mapDispatch)(Questions)
