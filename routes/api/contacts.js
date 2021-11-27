const express = require('express')

const { joiSchema } = require('../../model/contact')
const { validation, controllerWrapper } = require('../../middlewares')
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
} = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(listContacts))

router.get('/:contactId', controllerWrapper(getContactById))

router.post('/', validation(joiSchema), controllerWrapper(addContact))

router.delete('/:contactId', controllerWrapper(removeContact))

router.put(
  '/:contactId',
  controllerWrapper(updateContact)
)

router.patch('/:contactId/favorite', controllerWrapper(updateStatusContact))

module.exports = router
