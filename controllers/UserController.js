const User = require('../models/User')

const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role } = req.body

    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .json({ status: false, message: 'Missing required fields' })
    }
    const allCoupons = await User.find({})
    const user = new User({
      firstName,
      lastName,
      email,
      role,
      id: 3000 + allCoupons.length,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch (error) {
    // Pass the error to the next middleware
    next(error)
  }
}

module.exports = { createUser }
