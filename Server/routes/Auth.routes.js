import express from 'express'
import { Login, Register,GoogleLogin } from '../controllers/Auth.controller.js'

const AuthRoute = express.Router()

AuthRoute.post('/register', Register)
AuthRoute.post('/login', Login)
AuthRoute.post('/googlelogin', GoogleLogin)

export default AuthRoute