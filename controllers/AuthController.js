const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/AuthUtils')
const User = require('../models/User')

let refreshTokens = []

const login = async (req, res, next) => {
  const { email, password } = req.body
  const existingUser = await User.findOne({ email: email })

  if (!existingUser) {
    return res
      .status(401)
      .json({ status: false, message: 'Invalid username or passoword.' })
  }
  const passwordMatch = await bcrypt.compare(password, existingUser.password)

  if (!passwordMatch) {
    return res
      .status(401)
      .json({ status: false, message: 'Invalid username or passoword.' })
  }

  const user = { id: existingUser.id }
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
}

const refreshToken = async (req, res, next) => {
  const refreshToken = req.body.token
  if (refreshToken == null)
    return res.status(403).json({ status: false, message: 'Invalid token.' })
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).json({ status: false, message: 'Invalid token.' })
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ status: false, message: 'Invalid token.' })
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
}
const logout = async (req, res, next) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token)
  res.sendStatus(204)
}

module.exports = { login, refreshToken, logout }
