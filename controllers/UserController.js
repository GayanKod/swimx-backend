const User = require('../models/User')

const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role } = req.body

    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .json({ status: false, message: 'Missing required fields' })
    }
    const allUsers = await User.find({})
    const user = new User({
      firstName,
      lastName,
      email,
      role,
      id: 3000 + allUsers.length,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
}
const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const updateUserById = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body
    const userId = req.params.id

    User.findOne({ _id: userId }).catch(() => {
      res.status(404).json({ status: false, message: 'User not found' })
    })

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        email,
      },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

const deleteuserById = async (req, res) => {
  try {
    const userId = req.params.id
    const result = await User.deleteOne({ _id: userId })
    if (result.deletedCount === 0) {
      res.status(404).json({ status: false, message: 'User not found' })
    }
    res.status(200)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteuserById,
}
