const User = require('../models/User')
const bcrypt = require('bcrypt')
const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role, password, phoneNumber } = req.body

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: 'Missing required fields' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const existUser = await User.findOne({ email: email })
    if (existUser) {
      return res
        .status(400)
        .json({ status: false, message: 'Email is already exists.' })
    }
    const allUsers = await User.find({})
    const user = new User({
      firstName,
      lastName,
      email,
      role,
      id: 3000 + allUsers.length,
      password: hashedPassword,
      phoneNumber,
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
    const { firstName, lastName, email, phoneNumber } = req.body
    const userId = req.params.id
    User.findOne({ _id: userId }).catch(() => {
      res.status(404).json({ status: false, message: 'User not found' })
    })
    const existUser = await User.findOne({ email: email })
    if (existUser) {
      return res
        .status(400)
        .json({ status: false, message: 'Email is already exists.' })
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        email,
        phoneNumber,
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

const updatePasswordById = async (req, res, next) => {
  try {
    const { currentPassword, NewPassword } = req.body
    const userId = req.params.id
    User.findOne({ _id: userId })
      .then(async (existingUser) => {
        const passwordMatch = await bcrypt.compare(
          currentPassword,
          existingUser.password
        )
        if (!passwordMatch) {
          return res
            .status(200)
            .json({ status: false, message: 'Missmatch current password' })
        }
        const hashedNewPassword = await bcrypt.hash(NewPassword, 10)
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            password: hashedNewPassword,
          },
          { new: true }
        )
        res.status(200).json(updatedUser)
      })
      .catch(() => {
        res.status(404).json({ status: false, message: 'User not found' })
      })
  } catch (error) {
    next(error)
  }
}

const deleteuserById = async (req, res, next) => {
  try {
    const userId = req.params.id
    console.log(userId)
    const result = await User.deleteOne({ _id: userId })
    console.log(result)
    if (result.deletedCount === 0) {
      res.status(404).json({ status: false, message: 'User not found' })
    }
    res.sendStatus(200)
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
  updatePasswordById,
}
