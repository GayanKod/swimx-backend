function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'

  if (err.name === 'ValidationError') {
    statusCode = 400
    const errors = {}
    for (const field in err.errors) {
      errors[field] = err.errors[field].message
    }
    message = { errors }
  }

  res
    .status(statusCode)
    .json({ status: false, message: message?.errors || message })
}

module.exports = errorHandler
