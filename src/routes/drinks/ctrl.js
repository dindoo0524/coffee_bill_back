const getDrinks = (req, res) => {

  const list = [
    'latte',
    'juice',
    'ice coffee'
  ]

  res.send({ list })
}

const addDrink = (req, res) => {
  const {drinkName} = req.body

  const data = {
    drinkName
  }

  res.send(data)
}

module.exports = {
    getDrinks,
    addDrink
}