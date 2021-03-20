import express from 'express';

//Import logic to routes
import * as logFunctions from '../controllers/logs.js'

const router = express.Router();

//Call functions when routes are hit 
router.get('/list', logFunctions.getLogs);
router.post('/', logFunctions.addLog);

export default router;