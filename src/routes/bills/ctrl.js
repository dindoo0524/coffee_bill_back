const Bill = require('../../models/Bill')

const getBills = async (req, res) => {
  try {
    const bills = await Bill.getBills()

    res.json(bills)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const createBill = async (req, res) => {
  const {orderName, description, userId} = req.body

  const data = {
    userId,
    orderName,
    description
  }

  try {
    const seq = await Bill.createBill(data)
    res.json({seq, ...data})
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const getBill = async (req, res) => {
  const { billSeq } = req.params

  try {
    const bill = await Bill.getBill(billSeq)

    res.json(bill)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const finishBill = async (req, res) => {
  const { billSeq } = req.params;

  try {
    await Bill.finishBill(billSeq)
    const bill = await Bill.getBill(billSeq)

    res.json(bill)
  } catch (err) {
    console.error(err)
  }
}

const checkBill = async (req, res, next) => {
  const { billSeq } = req.params

  try {
    // billSeq 가 유효한 값인지 check
    const exist = await Bill.checkBill(billSeq)
    if (!exist) {
      res.status(400).json({ message: 'Bill does not exist' })
      return
    }
    next()
  } catch (err) {
    console.error(err)
    next(err)
  }

}

const checkAuth = async (req, res, next) => {
  const { billSeq } = req.params
  const { nickname } = req.body

  try {
    const auth = await Bill.checkAuth(billSeq, nickname)
    if (!auth) {
      res.status(400).json({ message: 'Authentication failed ' })
      return
    }
    next()
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports = {
  getBills,
  createBill,
  getBill,
  finishBill,
  checkBill,
  checkAuth
}