const db = require('../config/db')

class Drink {
    static async getDrinks() {
        const conn = await db.connection()
        const query = 'SELECT * FROM drinks'
        const [rows] = await conn.execute(query);
        return rows
    }

    static async searchDrinks(keyword) {
        const conn = await db.connection()
        const query = `SELECT * FROM drinks where drinkName LIKE '%?%'`
        const [rows] = await conn.execute(query, [keyword]);
        return rows
    }

    static async addDrink(drinkName) {
        const conn = await db.connection()
        const query = 'INSERT INTO drinks(drinkName) VALUES (?)'
        const result = await conn.execute(query, [drinkName]);
        return result[0].insertId
    }
}

module.exports = Drink