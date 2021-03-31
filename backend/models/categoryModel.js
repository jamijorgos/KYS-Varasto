import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const CategoryModel = mongoose.model('CategoryModel', categorySchema);

export default CategoryModel;