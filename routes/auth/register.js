const auth = require("../../controllers/auth");

const register = async (req, res) => {
	try {
		await auth.register(req, res);
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = register;
