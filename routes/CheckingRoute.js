const router = require('express').Router()
const CheckingController = require('../controllers/CheckingController')

router.get('/user/:id', CheckingController.checking)
router.get('/:id', CheckingController.getCheckingById)
// router.get('/', UserController.getAllUsers)
// router.patch('/:id', UserController.updateUserById)
// router.delete('/:id', UserController.deleteuserById)
module.exports = router
