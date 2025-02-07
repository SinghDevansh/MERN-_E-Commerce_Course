import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

// @desc Create New Order
//@route /api/orders
//@access private
const addOrderItems = asyncHandler (async(req, res) => {
    const { orderItems,
        shippingAddress,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentMethod
    } = req.body
    if (orderItems && orderItems.length === 0)
    {
        res.status(400)
        throw new Error('No order Items')
        return
    } else {
        const order = await new Order({
            orderItems,
            user:req.user._id,
            shippingAddress,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            paymentMethod
        })
        const createdOrder = await order.save()
        res.status(200).json(createdOrder)
    }
    
})

// @desc Get order by id
//@route /api/orders/:id
//@access private
const getOrderItemById = asyncHandler (async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    } else {
        res.status(401)
        throw new Error('Product Not Found')
    }
    
})
// @desc update order to paid
//@route /api/orders/:id/pay
//@access private
const updateOrderToPaid = asyncHandler (async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address:req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(401)
        throw new Error('Product Not Found')
    }
    
})
/// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
  
// @desc get logged in user orders
//@route /api/orders/myorders
//@access private
const getMyOrders = asyncHandler (async(req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
    
    
})
// @desc get all orders
//@route /api/orders
//@access private/Admin
const getOrders = asyncHandler (async(req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})
export {
    addOrderItems,
    getOrderItemById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders
}