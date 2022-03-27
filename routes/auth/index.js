const express = require("express");

const checkSigned = require("../../middlewares/checkSigned");
const checkRegisterInitial = require("../../middlewares/checkRegisterInitial");

const login = require("./login");
const register = require("./register");
const verify = require("./verify");

const router = express.Router();

// create new user => anyone
router.post("/register", checkRegisterInitial, register);
// login a user => anyone
router.post("/login", login);
// check if signed in on reload => user
router.all("/verify", checkSigned, verify);

module.exports = router;
