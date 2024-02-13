const Checking = require('../models/Checking')

const checking = async (req, res, next) => {
  try {
    const user = req.params.id
    const scannedTime = new Date()

    // check last record is null or not
    const lastRecord = await Checking.findOne({ user: user })
      .sort({ createdAt: -1 })
      .exec()
    console.log(lastRecord)
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
        await Checking.findByIdAndUpdate(
          lastRecord._id,
          {
            checkoutTime: scannedTime,
          },
          { new: true }
        )
        res.status(200).json('checked out')
      } else {
        console.log('The last record does not belong to today.')
        // send a suggetion
        res
          .status(200)
          .json('Please checkout the last checking ' + lastRecord._id)
      }
    } else {
      const checking = new Checking({
        checkingTime: scannedTime,
        user,
      })

      const savedRecord = await checking.save()
      res.status(201).json('Checked in')
    }
  } catch (error) {
    next(error)
  }
}

const getCheckingById = async (req, res, next) => {
  try {
    const userId = req.params.id
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
module.exports = {
  checking,
  getCheckingById,
}
