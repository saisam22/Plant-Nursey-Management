const asyncHandler = require('express-async-handler');
const Plant = require('../models/Plant');

// @desc    Get all plants
// @route   GET /api/plants
// @access  Public
const getPlants = asyncHandler(async (req, res) => {
    const plants = await Plant.find({});
    res.status(200).json(plants);
});

// @desc    Get single plant
// @route   GET /api/plants/:id
// @access  Public
const getPlantById = asyncHandler(async (req, res) => {
    const plant = await Plant.findById(req.params.id);
    if (plant) {
        res.status(200).json(plant);
    } else {
        res.status(404);
        throw new Error('Plant not found');
    }
});

// @desc    Create a plant
// @route   POST /api/plants
// @access  Public
const createPlant = asyncHandler(async (req, res) => {
    const { name, category, price, quantity, description, image } = req.body;
    const plant = await Plant.create({
        name,
        category,
        price,
        quantity,
        description,
        image
    });
    res.status(201).json(plant);
});

// @desc    Update a plant
// @route   PUT /api/plants/:id
// @access  Public
const updatePlant = asyncHandler(async (req, res) => {
    const plant = await Plant.findById(req.params.id);
    if (plant) {
        plant.name = req.body.name || plant.name;
        plant.category = req.body.category || plant.category;
        plant.price = req.body.price || plant.price;
        plant.quantity = req.body.quantity || plant.quantity;
        plant.description = req.body.description || plant.description;
        plant.image = req.body.image || plant.image;

        const updatedPlant = await plant.save();
        res.status(200).json(updatedPlant);
    } else {
        res.status(404);
        throw new Error('Plant not found');
    }
});

// @desc    Delete a plant
// @route   DELETE /api/plants/:id
// @access  Public
const deletePlant = asyncHandler(async (req, res) => {
    const plant = await Plant.findById(req.params.id);
    if (plant) {
        await plant.deleteOne();
        res.status(200).json({ message: 'Plant removed' });
    } else {
        res.status(404);
        throw new Error('Plant not found');
    }
});

module.exports = {
    getPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant
};