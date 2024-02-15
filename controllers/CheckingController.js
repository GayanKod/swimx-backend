const Checking = require('../models/Checking')
const User = require('../models/User')

const checking = async (req, res, next) => {
  try {
    const user = req.params.id
    const scannedTime = new Date()

    User.findOne({ _id: user }).catch(() => {
      res.status(404).json({ status: false, message: 'User not found' })
    })

    // check last record is null or not
    const lastRecord = await Checking.findOne({ user: user })
      .sort({ createdAt: -1 })
      .exec()

    //if not null     // check whther the date is same
    if (lastRecord && !lastRecord.checkoutTime) {
      const lastRecordDate = new Date(lastRecord.checkingTime)
      // Check if the checkingTime of the last record is from today
      if (
        lastRecordDate.getDate() === scannedTime.getDate() &&
        lastRecordDate.getMonth() === scannedTime.getMonth() &&
        lastRecordDate.getFullYear() === scannedTime.getFullYear()
      ) {
        console.log('The last record belongs to today.')
        const checkedOut = await Checking.findByIdAndUpdate(
          lastRecord._id,
          {
            checkoutTime: scannedTime,
          },
          { new: true }
        )
        res.status(200).json(checkedOut)
      } else {
        console.log('The last record does not belong to today.')
        res.status(200).json({
          status: true,
          message: `Problem with ${lastRecord._id} checking.`,
        })
      }
    } else {
      const checking = new Checking({
        checkingTime: scannedTime,
        user,
      })

      const checkedIn = await checking.save()

      res.status(200).json(checkedIn)
    }
  } catch (error) {
    next(error)
  }
}

const getCheckingById = async (req, res, next) => {
  try {
    const userId = req.params.id

    User.findOne({ _id: userId }).catch(() => {
      res.status(404).json({ status: false, message: 'User not found' })
    })

    const user = await Checking.findById(userId)

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: 'Checking not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

const updateCheckinById = async (req, res, next) => {
  try {
    const { checkingTime, checkoutTime } = req.body
    const userId = req.params.id

    User.findOne({ _id: userId }).catch(() => {
      res.status(404).json({ status: false, message: 'User not found' })
    })

    const updatedChecking = await Checking.findByIdAndUpdate(
      userId,
      {
        checkingTime,
        checkoutTime,
      },
      { new: true }
    )
    res.status(200).json(updatedChecking)
  } catch (error) {
    next(error)
  }
}

const getAllCheckings = async (req, res, next) => {
  try {
    const checkings = await Checking.find().sort({ createdAt: -1 })
    res.status(200).json(checkings)
  } catch (error) {
    next(error)
  }
}

const deleteCheckingById = async (req, res) => {
  try {
    const checkingId = req.params.id
    const result = await Checking.deleteOne({ _id: checkingId })
    if (result.deletedCount === 0) {
      res.status(404).json({ status: false, message: 'Checking not found' })
    }
    res.status(200)
  } catch (error) {
    next(error)
  }
}
const getCheckingsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id

    User.findOne({ _id: userId }).catch(() => {
      res.status(404).json({ status: false, message: 'User not found' })
    })

    const checkings = await Checking.find({ user: userId })

    res.status(200).json(checkings)
  } catch (error) {
    next(error)
  }
}
module.exports = {
  checking,
  getCheckingById,
  updateCheckinById,
  getAllCheckings,
  deleteCheckingById,
  getCheckingsByUserId,
}
