const Drink = require('../../models/Drink')

const getDrinks = async (req, res) => {
  try {
    const rows = await Drink.getDrinks();
    res.json({ rows })
  } catch (err) {
    console.error(err)
  }
}

const addDrink = async (req, res) => {
  const { drinkName } = req.body    
  
  try {
    const seq = await Drink.addDrink(drinkName)
    const data = { seq, drinkName }
    res.json(data)
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getDrinks,
  addDrink
}