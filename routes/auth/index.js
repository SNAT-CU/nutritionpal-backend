const express = require("express");
const checkSigned = require("../../middlewares/checkSigned");

const router = express.Router();

// create new user => anyone
// TODO: Register Initial Check || register router
router.post("/register");
// login a user => anyone
// TODO: login router
router.post("/login",);
// check if signed in on reload => user
// TODO: Verify if user is logged in
router.all("/verify", checkSigned);

module.exports = router;
