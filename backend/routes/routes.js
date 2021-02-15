import express from 'express';

//Import logic to routes
import * as itemFunctions from '../controllers/items.js'

const router = express.Router();

//Call functions when routes are hit 
router.get('/', itemFunctions.getAllItems);
router.post('/', itemFunctions.addNewItem);

export default router;