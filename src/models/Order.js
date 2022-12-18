const db = require('../config/db')

class Order {
    static async getAllOrders(billSeq) {
        const conn = await db.connection()
        const query = `SELECT o.drinkSeq, d.drinkName, o.drinkType, o.optionDescription FROM orders o
                        JOIN drinks d ON o.drinkSeq = d.seq
                        where o.billSeq = ?`
        const [rows] = await conn.execute(query, [billSeq]);
        return rows
    }

    static async getDrinkOrders(billSeq, drinkSeq, drinkType) {
        const conn = await db.connection()
        const query = 'SELECT nickname, optionDescription FROM orders where billSeq = ? and drinkSeq = ? and drinkType = ?'
        const [rows] = await conn.execute(query, [billSeq, drinkSeq, drinkType]);
        return rows
    }

    static async addOrder(billSeq, data) {
        const { drinkSeq, nickname, drinkType, optionDescription } = data;
        const record = [billSeq, drinkSeq, nickname, drinkType, optionDescription]
        const conn = await db.connection()
        const query = 'INSERT INTO orders(billSeq, drinkSeq, nickname, drinkType, optionDescription ) VALUES (?, ?, ?, ?, ?)'
        const result = await conn.execute(query, record);
        return result[0].insertId
    }
}

module.exports = Order