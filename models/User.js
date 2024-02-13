const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    firstName: {
      type: String,
      minlength: [2, 'First name must be at least 2 characters long.'],
      maxlength: [100, 'First name cannot exceed 100 characters.'],
      required: [true, 'First name is required.'],
    },
    lastName: {
      type: String,
      minlength: [2, 'Last name must be at least 2 characters long.'],
      maxlength: [100, 'Last name cannot exceed 100 characters.'],
      required: [true, 'Last name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v)
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    qr: {
      type: String,
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
