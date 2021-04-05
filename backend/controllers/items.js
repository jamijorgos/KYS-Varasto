import mongoose from 'mongoose';
import ItemModel from '../models/itemModel.js'

// Get all items
export const getAllItems = async (req, res) => {
    try {
        const allItems = await ItemModel.find();
        res.status(200).json(allItems);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// Add new Item
export const addNewItem = async (req, res) => {
    const item = req.body;
    const newItem = new ItemModel(item);
    try {
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
// Get item by ID
export const getItemByID = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('Item ID not found');

    const itemByID = await ItemModel.findById(_id);
    res.json(itemByID);
}
// Update item by ID (toimii myös saldon muuttamisessa?)
export const updateItemByID = async (req, res) => {
    const { id: _id } = req.params;
    const item = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('Item ID not found');

    const updatedItem = await ItemModel.findByIdAndUpdate(_id, item, { new: true });
    res.json(updatedItem)
}
//Delete Product by ID
export const deleteItem = async (req, res) => {
    const { id: _id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send({ message: 'Item ID not found' })

    await ItemModel.findByIdAndDelete(_id);
    res.send({ message: `Item ID: ${_id} deleted` });
}
//Get all Categories
export const getAllCategories = async (req, res) => {
    try {
        const allCategories = await ItemModel.find().distinct("category");
        res.status(200).json(allCategories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// Get item by category
export const getItemsByCategory = async (req, res) => {
    const { category: _category } = req.params;

    const itemsByCategory = await ItemModel.find({ category:  _category  });
    res.json(itemsByCategory);
}