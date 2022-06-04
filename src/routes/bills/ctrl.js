const createBill = (req, res) => {
  const {nickname, orderName, description} = req.body

  const data = {
    nickname,
    orderName,
    description
  }

  res.send(data)
}

const finishBill = (req, res) => {
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

const getOrders = (req, res) => {
  const { billSeq } = req.params;

  if (req.query.drinkSeq) {
      const data = [
          {
            nickname: 'elly',
            optionDescription: '얼음 1개 넣어주세요'
          },
          {
            nickname: 'dindoo',
            optionDescription: '정성을 담아주세요'
          },
          {
            nickname: 'jungho',
            optionDescription: '알아서 해주세요'
          },
          {
            nickname: 'jenny',
            optionDescription: undefined
          }
      ]
    
    res.send({data})
    
  } else {
    const list = [
      {
        orderSeq: 1,
        billSeq: 1,
        drinkSeq: 3,
        hotCount: 3,
        iceCount: 7
      },
      {
        orderSeq: 2,
        billSeq: 1,
        drinkSeq: 4,
        hotCount: 4,
        iceCount: 0
      },
      {
        orderSeq: 3,
        billSeq: 1,
        drinkSeq: 1,
        hotCount: 2,
        iceCount: 1
      }
    ]

    res.send({list})
  }
}

const addOrder = (req, res) => {
  const { billSeq } = req.params;
  const { drinkSeq, drinkType, optionDescription } = req.body;

  const data = {
    billSeq,
    drinkSeq,
    drinkType,
    optionDescription
  }

  res.send({ data })
}

module.exports = {
  createBill,
  finishBill,
  getOrders,
  addOrder
}