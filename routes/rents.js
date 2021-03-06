import express from 'express'
import { getRent, getRents, addRent, updateRent, deleteRent } from '../controllers/rentController.js'
import { catchErrors } from '../helpers.js'

const router = express.Router()

router.get('/rents', catchErrors(getRents)
/*
	#swagger.tags = ['Rents']
	#swagger.security = [{
		"bearerAuth": []
	}]
	#swagger.responses[200] = { description: 'Update the offer with the param ID' }
	#swagger.responses[401] = { description: 'Error : unauthorized access' }
*/
)
router.get('/rents/:id', catchErrors(getRent)
/*
	#swagger.tags = ['Rents']
	#swagger.security = [{
		"bearerAuth": []
	}]
	#swagger.responses[200] = { description: 'Return the rent with the param ID' }
	#swagger.responses[401] = { description: 'Error : unauthorized access' }
*/
)
router.post('/rents', catchErrors(addRent)
/*
	#swagger.tags = ['Rents']
	#swagger.security = [{
		"bearerAuth": []
	}]
	#swagger.requestBody = {
		required: true,
		content: {
			"application/json": {
				schema: {
					$ref: "#/components/schemas/rent"
				}  
			}
		}
	}
	#swagger.responses[200] = { description: 'Create a new rent' }
	#swagger.responses[401] = { description: 'Error : unauthorized access' }
*/
)
router.patch('/rents/:id', catchErrors(updateRent)
/*
	#swagger.tags = ['Rents']
	#swagger.security = [{
		"bearerAuth": []
	}]
	#swagger.responses[200] = { description: 'Update the rent with the param ID' }
	#swagger.responses[401] = { description: 'Error : unauthorized access' }
*/
)
router.delete('/rents/:id', catchErrors(deleteRent)
/*
	#swagger.tags = ['Rents']
	#swagger.security = [{
		"bearerAuth": []
	}]
	#swagger.responses[200] = { description: 'Delete the rent with the param ID' }
	#swagger.responses[401] = { description: 'Error : unauthorized access' }
*/
)
export default router