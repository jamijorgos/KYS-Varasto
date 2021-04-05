import express from 'express';

//Import logic to routes
import * as itemFunctions from '../controllers/items.js'

const router = express.Router();

//Call functions when routes are hit 
router.get('/', itemFunctions.getAllItems);
router.get('/category', itemFunctions.getAllCategories);
router.get('/category/:category', itemFunctions.getItemsByCategory);
router.post('/', itemFunctions.addNewItem);
router.get('/:id', itemFunctions.getItemByID);
router.patch('/:id', itemFunctions.updateItemByID);
router.delete('/:id', itemFunctions.deleteItem);

export default router;