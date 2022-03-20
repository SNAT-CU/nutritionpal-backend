const express = require("express");
const app = express();
require("dotenv").config({path: __dirname + "/.env"});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("Initial Express Application");
});

app.listen(PORT, () => {
	console.log("Server is listening on port", PORT);
});
