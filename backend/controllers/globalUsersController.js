const router = require("express").Router();
const globalUsersController = require("../models/global/gUsersModel");

router.get("/globalusers/", globalUsersController.getGlobalUsers);

module.exports = router;
