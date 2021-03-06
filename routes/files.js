import express from 'express'
import { upload } from '../upload.js'
import { getFile, uploadFile, deleteFile } from '../controllers/fileController.js'
import { catchErrors } from '../helpers.js'

const router = express.Router()

// @route   GET api/v1/files/:filename
// @desc    Return the file with the :filename param
// @access  Private
router.get('/files/:filename', catchErrors(getFile))

// @route   POST api/v1/files/
// @desc    Upload a new file
// @access  Private
router.post('/files', upload.single('file'), catchErrors(uploadFile))

router.delete('/files/:id', catchErrors(deleteFile))

export default router