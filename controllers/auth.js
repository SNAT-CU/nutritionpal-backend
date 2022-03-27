const PrismaClient = require("@prisma/client").PrismaClient;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const register = async (req, res) => {

	// checking if user already exists
	const userData = await prisma.user.findFirst({
		where: {
			email: req.body.email
		}
	});

	if(userData) {
		return res.status(400).send({
			success: false,
			message: "User already exists! Try Logging in"
		});
	}

	// registering user
	const userId = crypto.randomBytes(8).toString("hex");
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	const accessToken = jwt.sign({
		userId: userId,
		email: req.body.email,
		name: req.body.name,
	}, process.env.ACCESS_TOKEN_SECRET);

	try {
		await prisma.user.create({
			data: {
				userId: userId,
				email: req.body.email,
				password: hashedPassword,
			},
		});
		res.json({
			accessToken: accessToken,
			message: "User created",
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

const login = async (req, res) => {

	const accessToken = jwt.sign({
		userId: req.body.userId,
		email: req.body.email,
		name: req.body.name,
	}, process.env.ACCESS_TOKEN_SECRET);

	try {
		const user = await prisma.user.findOne({
			where: {
				email: req.body.email,
			},
		});
		if (!user) {
			throw new Error("User not found");
		}
		if (user.password !== req.body.password) {
			throw new Error("Password incorrect");
		}
		res.json({
			accessToken: accessToken,
			message: "User logged in",
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

const verify = async (req, res) => {
	res.send({
		...req.user,
		success: true,
		message: "Login Credentials are valid",
	});
};

module.exports = {
	register,
	login,
	verify
};
