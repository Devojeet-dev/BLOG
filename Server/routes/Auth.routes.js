import express from 'express'
import { Login, Register,GoogleLogin, Logout } from '../controllers/Auth.controller.js'

const AuthRoute = express.Router()

AuthRoute.post('/register', Register)
AuthRoute.post('/login', Login)
AuthRoute.post('/googlelogin', GoogleLogin)
AuthRoute.post('/logout', Logout)

export default AuthRoute