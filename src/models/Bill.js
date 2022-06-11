const db = require('../config/db')

class Bill {
    static async createBill(data) {
        const { orderName, description, nickname } = data;
        const record = [ orderName, description, nickname ]
        const conn = await db.connection()
        const result = await conn.execute('INSERT INTO bills (name, description, nickname) VALUES (?, ?, ?)', record);
        return result[0].insertId
    }

    static async checkBill(billSeq) {
        const conn = await db.connection()
        const result = await conn.execute('SELECT count(*) cnt FROM bills where seq = ?', [billSeq])
        const count = result[0][0].cnt
        return count > 0
    }

    static async finishBill(billSeq) {
        const conn = await db.connection()
        await conn.execute('UPDATE bills SET status = 1, endTime = now() where seq = ?', [billSeq]);
    }

    static async getBill(billSeq) {
        const conn = await db.connection()
        const [rows] = await conn.execute('SELECT * FROM bills where seq = ?', [billSeq])
        return rows
    }

    static async checkAuth(billSeq, nickname) {
        const conn = await db.connection()
        const result = await conn.execute('SELECT count(*) cnt FROM bills where seq = ? and nickname = ?', [billSeq, nickname])
        const count = result[0][0].cnt
        return count > 0
    }
}

module.exports = Bill