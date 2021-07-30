const express = require("express");
const menuRouter = express.Router();

const menuController = require("../../../controllers/menu.controller")

// Handle menu requests
menuRouter.get('/', menuController.getAllSnacks)
menuRouter.get('/:name', menuController.getSnack)

module.exports = menuRouter