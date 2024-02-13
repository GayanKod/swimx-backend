const express = require('express')
const cors = require('cors')
const app = express()
const errorHandler = require('./utils/error-handler')

const PORT = process.env.PORT || 5001

const connectDB = require('./config/db')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

// test api
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const UserRoute = require('./routes/UserRoute')
const CheckingRoute = require('./routes/CheckingRoute')

app.use('/api/user', UserRoute)
app.use('/api/check', CheckingRoute)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
