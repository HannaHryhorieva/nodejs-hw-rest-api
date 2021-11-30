const express = require('express')

const { joiSchema } = require('../../model/contact')
const { validation, controllerWrapper, authenticate } = require('../../middlewares')
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
} = require('../../controllers/contacts')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(listContacts))

router.get('/:contactId', authenticate, controllerWrapper(getContactById))

router.post('/', authenticate, validation(joiSchema), controllerWrapper(addContact))

router.delete('/:contactId', authenticate, controllerWrapper(removeContact))

router.put(
  '/:contactId', authenticate,
  controllerWrapper(updateContact)
)

router.patch('/:contactId/favorite', authenticate, controllerWrapper(updateStatusContact))

module.exports = router
