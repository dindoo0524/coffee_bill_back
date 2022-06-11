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
  const drinkSeq = req.query.drinkSeq
  
  let orders
  if (drinkSeq) {
    orders = await Order.getDrinkOrders(billSeq, drinkSeq)
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
    res.status(400).json({ message: '존재하지 않는 주문서 입니다' })
    return
  }
  next()
}

const checkAuth = async (req, res, next) => {
  const { billSeq } = req.params
  const { nickname } = req.body

  // billSeq 가 유효한 값인지 check
  const auth = await Bill.checkAuth(billSeq, nickname)
  if (!auth) {
    res.status(400).json({ message: '권한이 없습니다' })
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