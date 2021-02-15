import mongoose from 'mongoose'

const itemSchema = mongoose.Schema({
    name: String,
    amount: Number,
    location: String,
    category: String,
    image: String
});

const ItemModel = mongoose.model('ItemModel', itemSchema);

export default ItemModel;