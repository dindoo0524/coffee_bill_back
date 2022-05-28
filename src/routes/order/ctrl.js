

exports.getDrinkList = (req, res) => {

  const list = [
    'latte',
    'juice',
    'ice coffee'
  ]

  res.send({ list })
}

exports.orderDrink = (req, res) => {
  const { orderSeq, nickname, drinkSeq, drinkType, optionDesc } = req.body
  
  const data = {
    orderSeq,
    nickname,
    drinkSeq,
    drinkType,
    optionDesc
  }
  res.send(data)
}

exports.getOrders = (req, res) => {

  const list = [
    {
      drinkSeq: 10,
      drinkName: 'Latte',
      count: 2
    },
    {
      drinkSeq: 11,
      drinkName: 'Orange Juice',
      count: 1
    },
    {
      drinkSeq: 12,
      drinkName: 'Apple Juice',
      count: 2
    },
  ]

  res.send({ list })
}


exports.getOrderPeople = (req, res) => {
  const { orderSeq, drinkSeq } = req.params
  console.log(req.params)
  const orders = [
    {
      drinkSeq: 10,
      drinkName: 'Latte',
      orderPeople: [
        '박수현',
        '나진주'
      ]
    },
    {
      drinkSeq: 11,
      drinkName: 'Orange Juice',
      orderPeople: [
        '김민지',
        '깜지'
      ]
    },
    {
      drinkSeq: 12,
      drinkName: 'Apple Juice',
      orderPeople: [
        '우리엄마'
      ]
    }
  ]

  const result = orders.find((order) => order.drinkSeq == drinkSeq).orderPeople

  res.send({ result })
}

