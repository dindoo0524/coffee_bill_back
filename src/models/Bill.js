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
        return count
    }

    static async finishBill(billSeq) {
        const conn = await db.connection()
        await conn.execute('UPDATE bills SET status = 1, endTime = now() where seq = ?', [billSeq]);
        const [rows] = await conn.execute('SELECT * FROM bills where seq = ?', [billSeq])
        return rows
    }

    // static async getOrders(billSeq, drinkSeq) {
    //     const conn = await db.connection()
    //     let result;

    //     if (drinkSeq) {
    //         result = await conn.execute('SELECT * FROM orders where billSeq = ? and drinkSeq = ?', [billSeq, drinkSeq]);
    //     } else {
    //         result = await conn.execute('SELECT drinkSeq, drinkType, count(*) cnt FROM orders where billSeq = ? group by drinkSeq, drinkType', [billSeq]);
    //     }
    //     return result[0]
    // }

    // static async addOrder(billSeq, data) {
    //     const { drinkSeq, nickname, drinkType, optionDescription } = data;
    //     const record = [billSeq, drinkSeq, nickname, drinkType, optionDescription]
    //     const conn = await db.connection()
    //     await conn.execute('INSERT INTO orders(billSeq, drinkSeq, nickname, drinkType, optionDescription ) VALUES (?, ?, ?, ?, ?)', record);
    // }
}

module.exports = Bill