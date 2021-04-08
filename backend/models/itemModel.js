import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    number: {
        type: String
    }
});

const ItemModel = mongoose.model('ItemModel', itemSchema);

export default ItemModel;