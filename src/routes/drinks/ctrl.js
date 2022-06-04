const db = require('../../../config/db')

const getDrinks = async (req, res) => {
    const conn = await db.connection()
    const [rows] = await conn.execute('SELECT * FROM drinks');

    res.json({ success: true, rows })
}

const addDrink = async (req, res) => {
    const { drinkName } = req.body

    const conn = await db.connection()
    await conn.execute('INSERT INTO drinks(drinkName) VALUES (?)',[drinkName]);

    res.json({ sccuess: true })
}

module.exports = {
    getDrinks,
    addDrink
}