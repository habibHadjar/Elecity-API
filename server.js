import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routes from './routes/routes.js'
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(routes)

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))