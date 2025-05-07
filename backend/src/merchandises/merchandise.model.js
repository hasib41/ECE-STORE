const mongoose =  require('mongoose');

const merchandiseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:  {
        type: String,
        required: true,
    },
    category:  {
        type: String,
        required: true,
    },
   
    coverImage: {
        type: String,
        required: true,
    
    },
    availableSizes: {
        type: [String],  
        required: true,
    },
    sleeve: {
        type: [String], 
        required: true,
    },
    year: {
        type: Number,  
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
  }, {
    timestamps: true,
  });

  const Merchandise = mongoose.model('Merchandise', merchandiseSchema);

  module.exports = Merchandise;