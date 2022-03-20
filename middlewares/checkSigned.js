const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_token";

const checkSigned = async (req, res, next) => {
	const authHeader = req.headers.authorization || "";
	try {
		const jwtToken = authHeader
			.replace("Bearer ", "")
			.replace("Bearer", "");

		jwt.verify(jwtToken, ACCESS_TOKEN_SECRET, function (err, decoded) {
			if (err) {
				return res.status(401).send({
					success: false,
					message: "token not valid",
				});
			}
			req.user = {
				userId: decoded.userId || 1,
				roles: decoded.roles || ["USER"],
				email: decoded.email || "email@mail.com",
				name: decoded.name || "User Name",
			};
			return next();
		});
	} catch (err) {
		res.status(401).send({
			success: false,
			message: "token not valid",
		});
	}
};

module.exports = checkSigned;
