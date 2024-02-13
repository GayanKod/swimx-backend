const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/', UserController.createUser)
router.get('/:id', UserController.getUserById)
router.get('/', UserController.getAllUsers)
router.patch('/:id', UserController.updateUserById)

module.exports = router
