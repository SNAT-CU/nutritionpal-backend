const emailValidate = require("../../utils/emailValidate");
const passwordValidate = require("../../utils/passwordValidate");

const checkRegisterInials = (req, res, next) => {
	const { name, email, password, confirmPassword } = req.body;

	if (!name) return res.status(406).send("Please provide your Name!");
	if (!email) return res.status(406).send("Please provide a Email!");
	if (email && !emailValidate(email))
		return res.status(406).send("Invalid Email!");
	if (!password) return res.status(406).send("Please Enter a Password!");
	if (password && !passwordValidate(password))
		return res.status(406).send("Invalid Password!");
	if (confirmPassword != password)
		return res.status(406).send("Password doesn't match!");
	next();
};

module.exports = checkRegisterInials;
