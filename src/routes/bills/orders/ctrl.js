const Order = require('../../../models/Order')

const getOrders = async (req, res) => {
  const { billSeq } = req.params;
  const { drinkSeq, drinkType } = req.query
  
  try {
    let orders
    if (drinkSeq) {
      orders = await Order.getDrinkOrders(billSeq, drinkSeq, drinkType)
    } else {
      orders = await Order.getAllOrders(billSeq)
    }
    res.json(orders)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const addOrder = async (req, res) => {
  const { billSeq } = req.params;
  const { drinkSeq, nickname, drinkType, optionDescription } = req.body;

  const data = {
    drinkSeq,
    nickname,
    drinkType,
    optionDescription
  }

  try {
    const seq = await Order.addOrder(billSeq, data)
    res.json({ seq, ...data})
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports = {
  getOrders,
  addOrder,
}