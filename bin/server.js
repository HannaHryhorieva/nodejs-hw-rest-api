const mongoose = require('mongoose')
const app = require('../app')

const PORT = process.env.PORT || 3000
// const DB_HOST = process.env.DB_HOST

mongoose
  .connect('mongodb+srv://ankanosya:AnkaN1309@cluster0.dhrno.mongodb.net/test-home-work?retryWrites=true&w=majority')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
    console.log('Database connection successful')
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })
