const db = require('../config/db')

class Bill {
    static async createBill(data) {
        const { orderName, description, nickname } = data;
        const record = [ orderName, description, nickname ]
        const conn = await db.connection()
        const query = 'INSERT INTO bills (name, description, nickname) VALUES (?, ?, ?)'
        const result = await conn.execute(query, record);
        return result[0].insertId
    }

    static async checkBill(billSeq) {
        const conn = await db.connection()
        const query = 'SELECT count(*) cnt FROM bills where seq = ?'
        const result = await conn.execute(query, [billSeq])
        const count = result[0][0].cnt
        return count > 0
    }

    static async finishBill(billSeq) {
        const conn = await db.connection()
        const query = 'UPDATE bills SET status = 1, endTime = now() where seq = ?'
        await conn.execute(query, [billSeq]);
    }

    static async getBill(billSeq) {
        const conn = await db.connection()
        const query = 'SELECT * FROM bills where seq = ?'
        const [rows] = await conn.execute(query, [billSeq])
        return rows
    }

    static async checkAuth(billSeq, nickname) {
        const conn = await db.connection()
        const query = 'SELECT count(*) cnt FROM bills where seq = ? and nickname = ?'
        const result = await conn.execute(query, [billSeq, nickname])
        const count = result[0][0].cnt
        return count > 0
    }
}

module.exports = Bill