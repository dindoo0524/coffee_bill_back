const db = require('../config/db')
const bcrypt = require('bcryptjs');
class Auth {
	static async login(nickname, password) {
		const { exist, rows } = await this.checkUser(nickname)
		if (!exist) {
			// 아이디가 존재하지 않습니다.
			return false
		}
		const hash = rows[0].password
		const result = await bcrypt.compare(password, hash)
		if (!result) {
			return false
		}
		return true
	}

	static async signUp(nickname, password) {
		const conn = await db.connection()
		const {exist} = await this.checkUser(nickname)
		if (exist) {
			return false
		}
		const hash = await this.getHashPassword(password)
		const query = 'INSERT INTO users (nickname, password) VALUES (?, ?)'
		const result = await conn.execute(query, [nickname, hash]);
		return true
	}

	static async checkUser(nickname) {
		const conn = await db.connection()
		const query = 'SELECT * FROM users where nickname = ?'
		const [rows] = await conn.execute(query, [nickname])
		const exist = rows.length > 0
		return { exist, rows }
	}

	static async getHashPassword(password) {
		try {
			const salt = await bcrypt.genSalt(10)
    	const hash =  await bcrypt.hash(password, salt)
			return hash
		} catch (e) {
			console.error(e)
		}
	}
}

module.exports = Auth