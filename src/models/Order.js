const db = require('../config/db')

class Order {
    static async getAllOrders(billSeq) {
        const conn = await db.connection()
        const [rows] = await conn.execute('SELECT drinkSeq, drinkType, count(*) cnt FROM orders where billSeq = ? group by drinkSeq, drinkType', [billSeq]);
        return rows
    }

    static async getDrinkOrders(billSeq, drinkSeq) {
        const conn = await db.connection()
        const [rows] = await conn.execute('SELECT * FROM orders where billSeq = ? and drinkSeq = ?', [billSeq, drinkSeq]);
        return rows
    }



    static async addOrder(billSeq, data) {
        const { drinkSeq, nickname, drinkType, optionDescription } = data;
        const record = [billSeq, drinkSeq, nickname, drinkType, optionDescription]
        const conn = await db.connection()
        const result = await conn.execute('INSERT INTO orders(billSeq, drinkSeq, nickname, drinkType, optionDescription ) VALUES (?, ?, ?, ?, ?)', record);
        return result[0].insertId
    }
}

module.exports = Order