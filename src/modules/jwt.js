const jwt = require('jsonwebtoken');

module.exports = {
	verify(token) {
		try {
			const decode = jwt.verify(token, process.env.SECRET);
			return { decode, message: null }
		} catch(e) {
			console.error(e)
			return { message: e.message }
		}
	},

	sign(nickname) {
		const token = jwt.sign({ nickname: nickname }, process.env.SECRET, { expiresIn: '1h' });
		return token
	}
}