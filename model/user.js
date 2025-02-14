const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter'
    },
    token: {
      type: String,
      default: null
    }
  },
  { versionKey: false }
)
const User = mongoose.model('user', userSchema)

const joiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  token: Joi.string()
})

module.exports = {
  User,
  joiSchema
}
