import mongoose from 'mongoose';

const logSchema = mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

const LogModel = mongoose.model('LogModel', logSchema);

export default LogModel;