exports.createBill = (req, res) => {
  const {nickname, orderName, description} = req.body

  const data = {
    nickname,
    orderName,
    description
  }

  res.send(data)
}

exports.finishBill = (req, res) => {
  const { orderSeq } = req.body

  const bills = [
    {
      orderSeq: 1,
      status: 0 // 1: end
    },
    {
      orderSeq: 2,
      status: 0 // 1: end
    },
  ]

  bills.find((bill) => bill.orderSeq === orderSeq).status = 1;

  res.send({ bills })
}