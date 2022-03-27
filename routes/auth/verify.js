const auth = require("../../controllers/auth");

const verify = async (req, res) => {
	try {
		await auth.verify(req, res);
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = verify;
