const emailValidate = (email) => {
	const re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+$/;
	return re.test(email);
};

module.exports = emailValidate;
