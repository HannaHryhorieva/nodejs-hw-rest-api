const fs = require('fs/promises')
const path = require('path')
// const contacts = require('./contacts.json');
const crypto = require('crypto')

const contactsPath = path.join(__dirname, 'contacts.json')
const readData = async () => {
  const result = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(result)
}
const listContacts = async () => {
  return await readData()
}

const getContactById = async contactId => {
  const contacts = await readData()
  const [result] = contacts.filter(contact => String(contact.id) === contactId)
  return result
}

const removeContact = async contactId => {
  const contacts = await readData()
  const result = contacts.filter(contact => String(contact.id) !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(result, null, 2))
  return result
}

const addContact = async body => {
  const contacts = await readData()
  const newContact = {
    id: crypto.randomUUID(),
    name: body.name,
    email: body.email,
    phone: body.phone
  }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

const updateContact = async (id, body) => {
  const contacts = await readData()
  const idx = contacts.findIndex(item => item.id === Number(id))
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...contacts[idx], ...body, id: Number(id) }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
