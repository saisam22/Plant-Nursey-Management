const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a plant name'],
        trim: true
    },
    image: {
        type: String,
        default: 'https://unsplash.com/photos/a-plant-in-a-pot-nkdEbc7gpSE',
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Indoor', 'Outdoor', 'Succulent', 'Flowering', 'Herb']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0, 'Price cannot be negative']
    },
    quantity: {
        type: Number,
        required: [true, 'Please add quantity in stock'],
        min: [0, 'Quantity cannot be negative']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Plant', plantSchema);