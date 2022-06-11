const Drink = require('../../models/Drink')

const getDrinks = async (req, res) => {
    const rows = await Drink.getDrinks();
    res.json({ rows })
}

const addDrink = async (req, res) => {
    const { drinkName } = req.body    
    const seq = await Drink.addDrink(drinkName)

    const data = {seq, drinkName}

    res.json(data)
}

module.exports = {
    getDrinks,
    addDrink
}