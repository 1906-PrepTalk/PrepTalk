'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const Question = require('../server/db/models/question')

const questions = [
  {
    question: 'Tell me about yourself.'
  },
  {
    question: 'Why are you interested in working here?'
  },
  {
    question: 'What kind of work environment are you looking for?'
  },
  {
    question: 'How would your peers / coworkers describe you?'
  },
  {
    question: 'Describe your perfect job.'
  },
  {
    question:
      'Tell me about a time when you and your teammates did not agree. How did you communicate your frustrations and what was the outcome?'
  },
  {
    question: 'What did you find most challenging about your last job?'
  },
  {
    question: 'What have you done that shows initiative?'
  },
  {
    question: 'Where do you see yourself in 5 years?'
  },
  {
    question: 'What are your weaknesses? What are you improving on?'
  },
  {
    question:
      'Discuss a professional accomplishment that you are most proud of.'
  },
  {
    question: 'What kind of salary are you looking for?'
  },
  {
    question:
      'What is your approach to balancing multiple, sometimes unexpected, tasks?'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  await Promise.all(
    questions.map(question => {
      return Question.create(question)
    })
  )

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
