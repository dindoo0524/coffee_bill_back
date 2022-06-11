const Drink = require('../../models/Drink')

const getDrinks = async (req, res) => {
    const rows = await Drink.getDrinks();
    res.json({ success: true, rows })
}

const addDrink = async (req, res) => {
    const { drinkName } = req.body    
    await Drink.addDrink(drinkName)

    res.json({ sccuess: true })
}

module.exports = {
    getDrinks,
    addDrink
}