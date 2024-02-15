const router = require('express').Router()
const CheckingController = require('../controllers/CheckingController')
const { isAdmin } = require('../middlewares/AuthMiddleware')

router.patch('/user/:id', CheckingController.checking)
router.get('/user/:id', CheckingController.getCheckingsByUserId)
router.get('/:id', CheckingController.getCheckingById)
router.get('/', isAdmin, CheckingController.getAllCheckings)
router.patch('/:id', CheckingController.updateCheckinById)
router.delete('/:id', isAdmin, CheckingController.deleteCheckingById)
module.exports = router
