import express from 'express'
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const Router = express()
Router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers)

Router.post('/login', authUser)

Router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

Router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    
export default Router