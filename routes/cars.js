import express from 'express'
import { getCars, getCar, addCar, updateCar, deleteCar } from '../controllers/carController.js'
import { catchErrors } from '../helpers.js'

const router = express.Router()

router.get('/cars', catchErrors(getCars)
/*
	#swagger.tags = ['Cars']
	#swagger.security = [{
		"bearerAuth": []
	}]
	#swagger.responses[200] = { description: 'Return all cars' }
	#swagger.responses[401] = { description: 'Error : unauthorized access' }
*/
)
router.get('/cars/:id', catchErrors(getCar)
/*
	#swagger.tags = ['Cars']
	#swagger.security = [{
		"bearerAuth": []
	}]
	#swagger.responses[200] = { description: 'Return the car with the param ID' }
	#swagger.responses[401] = { description: 'Error : unauthorized access' }
*/
)
router.post('/cars', catchErrors(addCar)
/*
	#swagger.tags = ['Cars']
	#swagger.security = [{
		"bearerAuth": []
	}]
	#swagger.requestBody = {
		required: true,
		content: {
			"application/json": {
				schema: {
					$ref: "#/components/schemas/car"
				}  
			}
		}
		}
	#swagger.responses[200] = { description: 'Create a new car' }
	#swagger.responses[401] = { description: 'Error : unauthorized access' }
*/
)
router.patch('/cars/:id', catchErrors(updateCar)
/*
	#swagger.tags = ['Cars']
	#swagger.security = [{
		"bearerAuth": []
	}]
	#swagger.responses[200] = { description: 'Update the car with the param ID' }
	#swagger.responses[401] = { description: 'Error : unauthorized access' }
*/
)
router.delete('/cars/:id', catchErrors(deleteCar)
/*
	#swagger.tags = ['Cars']
	#swagger.security = [{
		"bearerAuth": []
	}]
	#swagger.responses[200] = { description: 'Delete the car with the param ID' }
	#swagger.responses[401] = { description: 'Error : unauthorized access' }
*/
)
export default router