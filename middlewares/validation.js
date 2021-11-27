const { BadRequest } = require('http-errors')
const validation = schema => {
  const validationMiddleware = (req, _, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    next()
  }

  return validationMiddleware
}

module.exports = validation
