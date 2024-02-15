const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null)
    return res.status(403).send({
      status: false,
      message: 'Unauthorized',
    })

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).send({
        status: false,
        message: 'Expired token',
      })
    req.user = user
    next()
  })
}

async function isAdmin(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  const existingUser = await User.findOne({ id: decoded.id })

  if (!existingUser) {
    return res
      .status(401)
      .json({ status: false, message: 'Invalid username or passoword.' })
  }
  if (existingUser.role !== 'ADMIN')
    return res.status(403).send({
      status: false,
      message: 'Access Denied',
    })
  next()
}

module.exports = { authenticateToken, isAdmin }
