const db = require('../../config/db')

class Bill {
    static async createBill(data) {
        const { orderName, description, nickname } = data;
        const record = [ orderName, description, nickname ]
        const conn = await db.connection()
        await conn.execute('INSERT INTO bills (name, description, nickname) VALUES (?, ?, ?)', record);
    }

    static async finishBill(billSeq) {
        const conn = await db.connection()
        await conn.execute('UPDATE bills SET status = 1 where seq = ?', [billSeq]);
    }

    static async getOrders(billSeq, drinkSeq) {
        const conn = await db.connection()
        let rows;

        if (drinkSeq) {
            rows = await conn.execute('SELECT * FROM orders where billSeq = ? and drinkSeq = ?', [billSeq, drinkSeq]);
        } else {
            rows = await conn.execute('SELECT drinkSeq, drinkType, count(*) cnt FROM orders where billSeq = ? group by drinkSeq, drinkType', [billSeq]);
        }
        return rows
    }

    static async addOrder(billSeq, data) {
        const { drinkSeq, nickname, drinkType, optionDescription } = data;
        const record = [billSeq, drinkSeq, nickname, drinkType, optionDescription]
        const conn = await db.connection()
        await conn.execute('INSERT INTO orders(billSeq, drinkSeq, nickname, drinkType, optionDescription ) VALUES (?, ?, ?, ?, ?)', record);
    }
}

module.exports = Bill