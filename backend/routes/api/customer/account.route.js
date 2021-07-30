const express = require("express");
const router = express.Router();

const accountController = require("../../../controllers/account.controller");
const { authenticateUser } = require("../../../middleware/authenticate.user")

router.post("/signup", accountController.signup);
router.get("/userCheck/:username", accountController.userCheck);
router.get("/info/:username", authenticateUser, accountController.info);
router.post("/info/update", authenticateUser, accountController.updateInfo);

router.post("/login", accountController.login);

router.post("/authenticate", authenticateUser, accountController.authenticate);

module.exports = router;
