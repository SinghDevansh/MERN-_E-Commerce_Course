import express from 'express'
import {
    addOrderItems,
    getOrderItemById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders
    
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'



const router = express.Router()

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderItemById)
router.route('/:id/pay')
    .put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)



export default router