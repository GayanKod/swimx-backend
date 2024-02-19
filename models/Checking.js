const mongoose = require('mongoose')

const checkingSchema = new mongoose.Schema(
  {
    checkingTime: {
      type: Date,
      default: Date.now,
    },
    checkoutTime: {
      type: Date,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    hours: {
      type: Number,
      default: 0,
    },
    paid: {
      type: String,
      enum: ['PAID', 'PENDING'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
)

const Checking = mongoose.model('Checking', checkingSchema)

module.exports = Checking
