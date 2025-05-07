const express = require('express');
const Merchandise = require('./merchandise.model');
const { postAMerchandise, getAllMerchandise, getSingleMerchandise, UpdateMerchandise, deleteAMerchandise } = require('./merchandise.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router =  express.Router();

// frontend => backend server => controller => merchandise schema  => database => send to server => back to the frontend
//post = when submit something fronted to db
// get =  when get something back from db
// put/patch = when edit or update something
// delete = when delete something

// post a merchandise
router.post("/create-merchandise", verifyAdminToken, postAMerchandise)

// get all merchandise
router.get("/", getAllMerchandise);

// single merchandise endpoint
router.get("/:id", getSingleMerchandise);

// update a merchandise endpoint
router.put("/edit/:id", verifyAdminToken, UpdateMerchandise);

router.delete("/:id", verifyAdminToken, deleteAMerchandise)


module.exports = router;
