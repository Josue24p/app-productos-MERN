import {Schema, model} from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String, 
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imgURL:{
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},{
    timestamps: true,
    versionKey: false
})

export default model('Product',productSchema);