import 'dotenv/config';
import express from "express";
const app = express();
const port = process.env.PORT || 3000;
// import node-fetch
import fetch from "node-fetch";

app.get("/", async(req, res) => {
	res.json({
		message: "Hello World!"
	});
});

app.get("/bhoora", async (req, res) => {
	try {
		const response = await fetch("https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=toast&format=json", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + process.env.FATSECRET_TOKEN,
			}
		});
		const data = await response.json();
		res.json(data);
	}
	catch (error) {
		res.json({
			message: "Something went wrong",
			error: error
		});
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});