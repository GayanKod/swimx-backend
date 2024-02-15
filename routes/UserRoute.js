const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { isAdmin } = require('../middlewares/AuthMiddleware')

router.post('/', UserController.createUser)
router.get('/:id', UserController.getUserById)
router.get('/', isAdmin, UserController.getAllUsers)
router.patch('/:id', UserController.updateUserById)
router.delete('/:id', isAdmin, UserController.deleteuserById)
module.exports = router
