const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/accountName/:id', async (req, res, next) => {
  try {
    await User.update(
      {
        name: req.body.name
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
  } catch (err) {
    next(err)
  }
})

router.put('/accountEmail/:id', async (req, res, next) => {
  try {
    await User.update(
      {
        email: req.body.email
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
  } catch (err) {
    next(err)
  }
})

router.put('/accountOccupation/:id', async (req, res, next) => {
  try {
    await User.update(
      {
        occupation: req.body.occupation
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
  } catch (err) {
    next(err)
  }
})
