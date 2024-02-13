const mongoose = require('mongoose')

const URI =
  'mongodb+srv://navod:navod@cluster0.dnos9jm.mongodb.net/viharamahadevi?retryWrites=true&w=majority'

const connectDB = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('DB connected ....')
}

module.exports = connectDB
