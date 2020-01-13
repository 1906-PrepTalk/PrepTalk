import React, {Component} from 'react'
import {Button, Icon} from 'semantic-ui-react'
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
      <div className="questionGenerator">
        <h3 className="text-center">Ready? Let's get started!</h3>
        <Button
          type="button"
          onClick={this.randomQuestions}
          inverted
          color="green"
          basic
        >
          {' '}
          <Icon name="question" /> Generate a question!
        </Button>{' '}
        <h3>{this.state.question}</h3>
      </div>
    )
  }
}
