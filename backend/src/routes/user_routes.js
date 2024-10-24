const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const verifyToken = require('../middleware/VerifyRoutes')

router.get("/:id" ,verifyToken, userController.UserData)
router.post('/signup' , userController.Signup)
router.post('/login' , userController.Login)
router.put('/update' ,verifyToken, userController.UpdateUser)

module.exports = router 
