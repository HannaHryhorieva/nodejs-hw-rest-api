const { Conflict, Unauthorized } = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../../model/user')

const { SECRET_KEY } = process.env

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const newUser = await User.create({ email, password: hashPassword })
  res.status(201).json({
    status: 'success',
    code: 201,
    user: {
      email: newUser.email,
      subscription: newUser.subscription
    }
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  const compareResult = bcrypt.compareSync(password, user.password)
  if (!user || !compareResult) {
    throw new Unauthorized('Email or password is wrong')
  }
  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    status: 'success',
    code: 200,
    data: {
      email: user.email,
      subscription: user.subscription,
      token
    }
  })
}

const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  res.status(204).json()
}

const current = async (req, res) => {
  const { _id } = req.user
  const [currentUser] = await User.find(_id)
  if (!currentUser) {
    throw new Unauthorized('Not authorized')
  }
  console.log(currentUser)
  res.json({
    status: 'success',
    code: 200,
    data: {
      email: currentUser.email,
      subscription: currentUser.subscription
    }
  })
}

module.exports = {
  register,
  login,
  logout,
  current
}
