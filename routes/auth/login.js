const auth = require("../../controllers/auth");

const login = async (req, res) => {
	try {
		await auth.login(req, res);
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = login;
