import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import request from 'supertest'
import router from '../routes/routes.js'
import userModel from '../models/userModel.js'

dotenv.config()

const API_KEY = process.env.API_KEY
const PORT = process.env.PORT || 5001
const app = express()

app.use(cors({
    origin: '*',
    options: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-type,token'
}))
app.use(express.json())

mongoose.connect(process.env.MONGODB)

app.use('/api/v1', router)
app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`))

/* ==================== UNIT TESTS ==================== */

/* ========== SERVER TEST ========== */
describe('Testing the server status', () => {
	it('should return a 200 status code', async () => {
		const response = await request(app).get('/api/v1/')
		expect(response.statusCode).toBe(200)
	})
})
/*
========== USER ROUTES ==========
*/
describe('Testing users routes', () => {
	const testUser = {
		first_name: 'Super',
		last_name: 'Test',
		address: {
			street: 'Jest Road',
			zipcode: 12345,
			city: 'Jest City'
		},
		birth_date: '01/01/1970',
		phone: '0123456789',
		mail: 'supertest@mail.com',
		password: 'password',
		role: 'Test'
	}
	// Create an user and return his ID to test the routes
	const getUserId = async () => {
		const response = await request(app).post('/api/v1/users')
		.send(testUser)
		.set({ token: API_KEY })
		return response.body._id
	}

	it('should return all users', async () => {
		const response = await request(app).get('/api/v1/users')
		.set({ token: API_KEY })
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('should create an user', async () => {
		const response = await request(app).post('/api/v1/users')
		.send(testUser)
		.set({ token: API_KEY })
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('should return an user', async () => {
		const response = await request(app).get(`/api/v1/users/${await getUserId()}`)
		.set({ token: API_KEY })
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('should update an user', async () => {
		const response = await request(app).patch(`/api/v1/users/${await getUserId()}`)
		.send({
			first_name: 'SuperTest',
			last_name: 'Jest'
		})
		.set({ token: API_KEY })
		expect(response.statusCode).toBe(200)
		expect(response.type).toEqual('application/json')
	})

	it('should delete an user', async () => {
		const response = await request(app).delete(`/api/v1/users/${await getUserId()}`)
		.set({ token: API_KEY })
		expect(response.statusCode).toBe(200)
		expect(response.text).toEqual('User deleted')
	})

	afterAll(() => userModel.deleteMany({ role: 'test' }))
})
/*
========== CARS ROUTES ==========
*/