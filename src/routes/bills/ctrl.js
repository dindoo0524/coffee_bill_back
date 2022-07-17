const Bill = require('../../models/Bill')

const getBills = async (req, res) => {
  try {
    // const bills = await Bill.getBills()
    // TODO: 임시 데이터 코드
    const bills = [
      {
        seq: 1,
        title: '개발팀 커피타임'
      },
      {
        seq: 2,
        title: '디자인팀 커피타임'
      },
      {
        seq: 3,
        title: '기획팀 커피타임'
      },
      {
        seq: 4,
        title: '마케팅팀 커피타임'
      },
      {
        seq: 5,
        title: '우리모두 커피타임'
      }
    ]

    res.json(bills)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

const createBill = async (req, res) => {
  const {orderName, description, nickname} = req.body

  const data = {
    nickname,
    orderName,
    description
  }

  try {
    const seq = await Bill.createBill(data)
  } catch (err) {
    console.error(err)
    next(err)
  }

  res.json({seq, ...data})
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
  finishBill,
  checkBill,
  checkAuth
}