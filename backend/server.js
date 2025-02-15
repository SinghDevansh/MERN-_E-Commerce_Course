import path from 'path'
import express from 'express'
//import products from './data/products.js'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDb from './config/connect.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
const app = express()

dotenv.config()
connectDb()
if (process.env.NODE_ENV === 'Development')
{
    app.use(morgan('dev'))
}

app.get('/', (req, res) => {
    res.send('Api is running')
})
app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT 
app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} at port ${PORT}`.yellow))