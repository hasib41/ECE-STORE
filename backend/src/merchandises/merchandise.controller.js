const Merchandise = require("./merchandise.model");

const postAMerchandise = async (req, res) => {
    try {
        const newMerchandise = await Merchandise({...req.body});
        await newMerchandise.save();
        res.status(200).send({message: "Merchandise posted successfully", merchandise: newMerchandise})
    } catch (error) {
        console.error("Error creating merchandise", error);
        res.status(500).send({message: "Failed to create merchandise"})
    }
}

// get all merchandise
const getAllMerchandise=  async (req, res) => {
    try {
        const merchandises = await Merchandise.find().sort({ createdAt: -1});
        res.status(200).send(merchandises)
        
    } catch (error) {
        console.error("Error fetching merchandises", error);
        res.status(500).send({message: "Failed to fetch merchandises"})
    }
}

const getSingleMerchandise = async (req, res) => {
    try {
        const {id} = req.params;
        
        // Validate ID
        if (!id) {
            return res.status(400).send({message: "Merchandise ID is required"});
        }

        const merchandise = await Merchandise.findById(id);
        
        if(!merchandise){
            return res.status(404).send({message: "Merchandise not Found!"});
        }
        
        return res.status(200).send(merchandise);
        
    } catch (error) {
        console.error("Error fetching merchandise:", error);
        if (error.name === 'CastError') {
            return res.status(400).send({message: "Invalid merchandise ID format"});
        }
        return res.status(500).send({message: "Failed to fetch merchandise", error: error.message});
    }
}

// update merchandise data
const UpdateMerchandise = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedMerchandise =  await Merchandise.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedMerchandise) {
            res.status(404).send({message: "Merchandise is not Found!"})
        }
        res.status(200).send({
            message: "Merchandise updated successfully",
            merchandise: updatedMerchandise
        })
    } catch (error) {
        console.error("Error updating a merchandise", error);
        res.status(500).send({message: "Failed to update a merchandise"})
    }
}

const deleteAMerchandise = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedMerchandise=  await Merchandise.findByIdAndDelete(id);
        if(!deletedMerchandise) {
            res.status(404).send({message: "Merchandise is not Found!"})
        }
        res.status(200).send({
            message: "Merchandise deleted successfully",
            merchandise: deletedMerchandise
        })
    } catch (error) {
        console.error("Error deleting a merchandise", error);
        res.status(500).send({message: "Failed to delete a merchandise"})
    }
};

module.exports = {
    postAMerchandise,
    getAllMerchandise,
    getSingleMerchandise,
    UpdateMerchandise,
    deleteAMerchandise
}