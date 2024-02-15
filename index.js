const express = require('express')
const cors = require('cors')
const app = express()
const errorHandler = require('./utils/ErrorHandler')
const { authenticateToken } = require('./middlewares/AuthMiddleware')
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
const AuthRoute = require('./routes/AuthRoute')
const UserRoute = require('./routes/UserRoute')
const CheckingRoute = require('./routes/CheckingRoute')

app.use('/auth/v1', AuthRoute)
app.use('/api/v1/user', authenticateToken, UserRoute)
app.use('/api/v1/check', authenticateToken, CheckingRoute)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
