const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact']
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    favorite: {
      type: Boolean,
      default: false
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }

  },
  { versionKey: false }
)
const Contact = model('contact', contactSchema)

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required()
})

module.exports = { Contact, joiSchema }
