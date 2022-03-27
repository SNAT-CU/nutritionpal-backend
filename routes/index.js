const express = require("express");
const auth = require("./auth");

const router = express.Router();

router.use("/auth", auth);

router.use("/", (req, res) => {
	res.status(404).json({
		message: "Not found",
	});
});

module.exports = router;
