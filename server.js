const express = require("express");
const app = express();
require("dotenv").config({ path: __dirname + "/.env" });
const routes = require("./routes");

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => {
	console.log("Server is listening on port", PORT);
});
