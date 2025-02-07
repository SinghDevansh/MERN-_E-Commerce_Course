import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //res.send({ email, password })
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password)))
    {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password ')
    }

})
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists)
    {
        res.status(404)
        throw new Error('User Exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user)
    {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else {
        res.status(401)
        throw new Error('Invalid User')
    }
    
})
const getUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id)
    //console.log(user)
    if (user)
    {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
            
        })
    } else {
        res.status(401)
        throw new Error('Invalid User')
    }
    //res.send('success')
})
const updateUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id)
    //console.log(user)
    if (user)
    {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password)
        {
            user.password = req.body.password    
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token:generateToken(updatedUser._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
    //res.send('success')
})
// @desc get all users
//@route /api/users
//@access private/Admin
const getUsers = asyncHandler(async (req, res) => {
    
    const users = await User.find({})
    res.json(users)
})
// @desc delete a user
//@route DELETE /api/users/:id
//@access private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.id)
    if (user)
    {
        await user.remove()
        res.json({message:'User Removed'})
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
})
  
  // @desc    Update user
  // @route   PUT /api/users/:id
  // @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin 
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
})
  
export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}