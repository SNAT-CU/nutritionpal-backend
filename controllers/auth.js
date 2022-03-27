const PrismaClient = require("@prisma/client").PrismaClient;

const prisma = new PrismaClient();

const register = async (req, res) => {
	try {
		await prisma.user.create({
			data: {
				email: req.body.email,
				password: req.body.password,
			},
		});
		res.json({
			message: "User created",
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

const login = async (req, res) => {
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
