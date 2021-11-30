const express = require('express')

const { joiSchema } = require('../model/user')
const { validation, controllerWrapper, authenticate } = require('../middlewares')
const {
  register,
  login,
  logout,
  current
} = require('../controllers/users')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(register))
router.post('/login', validation(joiSchema), controllerWrapper(login))
router.post('/logout', authenticate, controllerWrapper(logout))
router.get('/current', authenticate, controllerWrapper(current))

module.exports = router
