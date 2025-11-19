const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Plant = require('../models/Plant');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Home page
router.get('/', async (req, res) => {
    res.render('index');
});

// Image proxy to avoid client-side blocking of external image hosts
// router.get('/image', async (req, res) => {
//     try {
//         const imageUrl = req.query.url;
//         if (!imageUrl) return res.status(400).send('Missing url parameter');

//         // Basic validation: allow only http(s) and common image hosts
//         if (!/^https?:\/\//i.test(imageUrl)) return res.status(400).send('Invalid URL');
//         const allowedHosts = ['source.unsplash.com', 'images.unsplash.com', 'unsplash.com'];
//         const parsed = new URL(imageUrl);
//         if (!allowedHosts.some(h => parsed.hostname.includes(h))) {
//             return res.status(403).send('Host not allowed');
//         }

//         const protocol = parsed.protocol === 'https:' ? require('https') : require('http');
//         protocol.get(imageUrl, (proxRes) => {
//             // Forward content-type and status
//             res.statusCode = proxRes.statusCode || 200;
//             const contentType = proxRes.headers['content-type'];
//             if (contentType) res.setHeader('Content-Type', contentType);
//             proxRes.pipe(res);
//         }).on('error', (err) => {
//             console.error('Image proxy error', err.message);
//             res.status(502).send('Error fetching image');
//         });
//     } catch (error) {
//         console.error('Image proxy exception', error);
//         res.status(500).send('Proxy failed');
//     }
// });

// Plants page
router.get('/plants', async (req, res) => {
    try {
        const plants = await Plant.find().sort({ name: 1 });
        res.render('plants', { 
            plants
        });
    } catch (error) {
        res.render('plants', { 
            plants: [], 
            error: 'Failed to load plants'
        });
    }
});

// Add new plant form
router.get('/plants/new', async (req, res) => {
    res.render('plant-form', { plant: null });
});

// Edit plant form
router.get('/plants/edit/:id', async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) {
            return res.redirect('/plants');
        }
        res.render('plant-form', { plant });
    } catch (error) {
        res.redirect('/plants');
    }
});

// Create new plant
router.post('/plants', async (req, res) => {
    try {
        const plantData = {
            name: req.body.name,
            category: req.body.category,
            price: parseFloat(req.body.price),
            quantity: parseInt(req.body.quantity),
            description: req.body.description,
            image: req.body.image || undefined
        };
        await Plant.create(plantData);
        res.redirect('/plants');
    } catch (error) {
        console.error('Error creating plant:', error);
        res.render('plant-form', { plant: req.body, error: 'Failed to create plant: ' + error.message });
    }
});

// Update plant
router.put('/plants/:id', async (req, res) => {
    try {
        const existingPlant = await Plant.findById(req.params.id);
        if (!existingPlant) {
            return res.redirect('/plants');
        }
        
        const plantData = {
            name: req.body.name,
            category: req.body.category,
            price: parseFloat(req.body.price),
            quantity: parseInt(req.body.quantity),
            description: req.body.description,
            image: req.body.image && req.body.image.trim() !== '' ? req.body.image : existingPlant.image
        };
        await Plant.findByIdAndUpdate(req.params.id, plantData, { new: true, runValidators: true });
        res.redirect('/plants');
    } catch (error) {
        console.error('Error updating plant:', error);
        res.render('plant-form', { plant: { ...req.body, _id: req.params.id }, error: 'Failed to update plant: ' + error.message });
    }
});

// Delete plant
router.delete('/plants/:id', async (req, res) => {
    try {
        await Plant.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

module.exports = router;