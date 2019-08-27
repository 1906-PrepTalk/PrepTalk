import axios from 'axios'

const GOT_QUESTION = 'GOT_QUESTION'

const gotQuestion = question => {
  return {
    type: GOT_QUESTION,
    question
  }
}

export const getQuestion = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/questions`)
    dispatch(gotQuestion(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GOT_QUESTION:
      return action.question
    default:
      return state
  }
}
