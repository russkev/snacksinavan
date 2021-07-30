const express = require("express");
const globalsRouter = express.Router();
const globalsController = require("../../controllers/globals.controller")

globalsRouter.get('/', globalsController.getGlobals)

module.exports = globalsRouter
