const express = require('express');
const router = express.Router();
const {
    getPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant
} = require('../controllers/plantController');

router.route('/')
    .get(getPlants)
    .post(createPlant);

router.route('/:id')
    .get(getPlantById)
    .put(updatePlant)
    .delete(deletePlant);

module.exports = router;