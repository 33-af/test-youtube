import express from 'express'
import {verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

orderRouter.post('/userorders', authUser, userOrders)
orderRouter.post('/verifyStripe', authUser, verifyStripe )

export default orderRouter
// https://buki.com.ua/ru/news/soversenstvuem-angliiskii-spisok-lucsix-razgovornyx-tem/
// https://www.englishdom.com/blog/opisanie-vneshnosti-cheloveka-na-anglijskom/