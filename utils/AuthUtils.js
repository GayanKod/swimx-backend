const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' })
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '20s' })
}
module.exports = { generateAccessToken, generateRefreshToken }
