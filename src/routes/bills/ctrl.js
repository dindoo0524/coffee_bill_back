const Bill = require('../../models/Bill')

const createBill = async (req, res) => {
  const {orderName, description, nickname} = req.body

  const data = {
    nickname,
    orderName,
    description
  }

  await Bill.createBill(data)

  res.json({ sccuess: true })
}

const finishBill = async (req, res) => {
  const { billSeq } = req.params;

  await Bill.finishBill(billSeq)

  res.json({ sccuess: true })
}

const getOrders = async (req, res) => {
  const { billSeq } = req.params;

  const rows = await Bill.getOrders(billSeq, req.query.drinkSeq)
  res.json({ success: true, rows})
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

  await Bill.addOrder(billSeq, data)
  res.json({ success: true })
}

module.exports = {
  createBill,
  finishBill,
  getOrders,
  addOrder
}