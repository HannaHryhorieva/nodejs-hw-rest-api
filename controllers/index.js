const Contact = require('../model/contact')
const { NotFound } = require('http-errors')

const listContacts = async (_, res) => {
  const result = await Contact.find({})
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}
const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId)
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}
const addContact = async (req, res) => {
  const result = await Contact.create(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
}

const removeContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndRemove(contactId)
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Remove success'
  })
}

const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new NotFound('missing fields')
  }
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true
  })
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

const updateStatusContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new NotFound('missing field favorite')
  }
  const { contactId } = req.params
  const { price } = req.body
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { price },
    { new: true }
  )
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
}
