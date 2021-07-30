const express = require('express');
const router = express.Router();

const vanController = require("../../../controllers/van.controller");
const { authenticateVanHeader } = require("../../../middleware/authenticate.van");

router.post("/login", vanController.login);
router.post("/authenticate", authenticateVanHeader, vanController.authenticateVan);
router.get("/vanDetails", authenticateVanHeader, vanController.vanDetails);

// Handle van status requests
router.post("/setStatus", authenticateVanHeader, vanController.setVanStatus);

// Not used in this deliverable
router.get('/all', vanController.getVans);


module.exports = router



