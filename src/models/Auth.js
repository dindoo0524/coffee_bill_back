const db = require('../config/db')

class Auth {
	static async login(nickname, password) {
		const conn = await db.connection()
		const query = 'SELECT COUNT(*) cnt FROM users where nickname = ? and password = ?'
		const result = await conn.execute(query, [nickname, password])
		const count = result[0][0].cnt
		return count > 0
	}
}

module.exports = Auth