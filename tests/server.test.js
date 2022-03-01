import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import request from 'supertest'
import routes from '../routes/routes.js'
import userModel from "../models/userModel.js"


dotenv.config()

const PORT = process.env.PORT || 5001
const app = express()

app.use(cors({
    origin: '*',
    options: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-type'
}))
app.use(express.json())

mongoose.connect(process.env.MONGODB)

app.use('/api/v1', routes)

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))


// // Unit Tests
const testUser = {
    first_name: 'Super',
    last_name: 'Test',
    address: {
        road: 'Jest',
        zipcode: 76,
        city: 'Jest City'
    },
    birth_date: '07/06/1995',
    phone: '0123',
    mail: 'jest@mail.com',
    password: 'motdepasseenclair',
    role: 'test'
}

describe('Testing the server status', () => {
    it('should return a 200 status code', async () => {
        const response = await request(app).get('/api/v1')
        expect(response.statusCode).toBe(200)
    })
})

// Users routes
describe('Testing users routes', () => {
    
    const createUserReturnId = async () => {
        const response = await request(app).post('/api/v1/users')
        .send(testUser)
        return response.body._id
    }

    afterAll(() => userModel.deleteMany({ role: 'test'}))
    
    it('should return all users', async () => {
        const response = await request(app).get('/api/v1/users')
        expect(response.statusCode).toBe(200)
        expect(response.type).toEqual('application/json')

    })
    
    it('should create an user', async () => {
        const response = await request(app).post('/api/v1/users')
        .send(testUser)
        expect(response.statusCode).toBe(200)
        expect(response.type).toEqual('application/json')
    })

    it('should update an user', async () => {
        const response = await request(app).patch(`/api/v1/users/${await createUserReturnId()}`)
        .send({
            first_name: 'super_test'
        })
        expect(response.statusCode).toBe(200)
        expect(response.type).toEqual('application/json')
    })

    it('should delete an user', async () => {
        const response = await request(app).delete(`/api/v1/users/${await createUserReturnId()}`)
        expect(response.statusCode).toBe(200)
        expect(response.type).toEqual('application/json')
    })

})


// Cars routes
describe('Testing cars routes', () => {
    
    const createUserReturnId = async () => {
        const response = await request(app).post('/api/v1/cars')
        .send(testUser)
        return response.body._id
    }

    afterAll(() => userModel.deleteMany({ role: 'test'}))
    
    it('should return all cars', async () => {
        const response = await request(app).get('/api/v1/cars')
        expect(response.statusCode).toBe(200)
        expect(response.type).toEqual('application/json')

    })
    
    it('should create an user', async () => {
        const response = await request(app).post('/api/v1/cars')
        .send(testUser)
        expect(response.statusCode).toBe(200)
        expect(response.type).toEqual('application/json')
    })

    it('should update an user', async () => {
        const response = await request(app).patch(`/api/v1/cars/${await createUserReturnId()}`)
        .send({
            first_name: 'super_test'
        })
        expect(response.statusCode).toBe(200)
        expect(response.type).toEqual('application/json')
    })

    it('should delete an user', async () => {
        const response = await request(app).delete(`/api/v1/cars/${await createUserReturnId()}`)
        expect(response.statusCode).toBe(200)
        expect(response.type).toEqual('application/json')
    })

})