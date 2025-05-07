const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/'));
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Get list of all available images
router.get('/list', (req, res) => {
    const uploadsDir = path.join(__dirname, '../../uploads');
    
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return res.status(500).json({ error: 'Failed to read images directory' });
        }
        
        // Filter for image files only
        const imageFiles = files.filter(file => 
            ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(
                path.extname(file).toLowerCase()
            )
        );
        
        // Return the list of image filenames
        res.json({ 
            images: imageFiles,
            imageBaseUrl: `${req.protocol}://${req.get('host')}/images/` 
        });
    });
});

// Upload a new image
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
    }
    
    res.json({ 
        success: true, 
        filename: req.file.filename,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
});

module.exports = router;