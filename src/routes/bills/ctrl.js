const Bill = require('../../models/Bill')
const Order = require('../../models/Order')

const createBill = async (req, res) => {
  const {orderName, description, nickname} = req.body

  const data = {
    nickname,
    orderName,
    description
  }

  const seq = await Bill.createBill(data)

  res.json({seq, ...data})
}

const finishBill = async (req, res) => {
  const { billSeq } = req.params;

  await Bill.finishBill(billSeq)
  const bill = await Bill.getBill(billSeq)

  res.json(bill)
}

const getOrders = async (req, res) => {
  const { billSeq } = req.params;
  const { drinkSeq, drinkType } = req.query
  
  let orders
  if (drinkSeq) {
    orders = await Order.getDrinkOrders(billSeq, drinkSeq, drinkType)
  } else {
    orders = await Order.getAllOrders(billSeq)
  }
  res.json(orders)
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

  const seq = await Order.addOrder(billSeq, data)
  res.json({ seq, ...data})
}

const checkBill = async (req, res, next) => {
  const { billSeq } = req.params

  // billSeq 가 유효한 값인지 check
  const exist = await Bill.checkBill(billSeq)
  if (!exist) {
    res.status(400).json({ message: 'Bill does not exist' })
    return
  }
  next()
}

const checkAuth = async (req, res, next) => {
  const { billSeq } = req.params
  const { nickname } = req.body

  const auth = await Bill.checkAuth(billSeq, nickname)
  if (!auth) {
    res.status(400).json({ message: 'Authentication failed ' })
    return
  }
  next()
}

module.exports = {
  createBill,
  finishBill,
  getOrders,
  addOrder,
  checkBill,
  checkAuth
}