import axios from 'axios'

// ACTION TYPES

const UPDATE_ACCOUNT_NAME = 'UPDATE_ACCOUNT_NAME'
const UPDATE_ACCOUNT_EMAIL = 'UPDATE_ACCOUNT_EMAIL'
const UPDATE_ACCOUNT_OCCUPATION = 'UPDATE_ACCOUNT_OCCUPATION'

// ACTION CREATORS

const updatedAccountName = info => ({
  type: UPDATE_ACCOUNT_NAME,
  info
})

const updatedAccountEmail = info => ({
  type: UPDATE_ACCOUNT_EMAIL,
  info
})

const updatedAccountOccupation = info => ({
  type: UPDATE_ACCOUNT_OCCUPATION,
  info
})

// UPDATE USER INFO

export const updateAccountName = (userId, info) => async dispatch => {
  try {
    const name = {
      name: info
    }
    const {data} = await axios.put(`/api/users/accountName/${userId}`, name)
    dispatch(updatedAccountName(data))
  } catch (err) {
    console.log(err)
  }
}

export const updateAccountEmail = (userId, info) => async dispatch => {
  try {
    const email = {
      email: info
    }
    const {data} = await axios.put(`/api/users/accountEmail/${userId}`, email)
    dispatch(updatedAccountEmail(data))
  } catch (err) {
    console.log(err)
  }
}

export const updateAccountOccupation = (userId, info) => async dispatch => {
  try {
    const occupation = {
      occupation: info
    }
    const {data} = await axios.put(
      `/api/users/accountOccupation/${userId}`,
      occupation
    )
    dispatch(updatedAccountOccupation(data))
  } catch (err) {
    console.log(err)
  }
}
