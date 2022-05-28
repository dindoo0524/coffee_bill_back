const express = require('express');

const route = express.Router();

route.get('/', (req, res) => {
  res.send('Hello World!')
})

route.post('/bill', (req, res) => {
  const {nickname, orderName, description} = req.body

  const data = {
    nickname,
    orderName,
    description
  }

  res.send(data)
})

route.get('/drinks', (req, res) => {

  const list = [
    'latte',
    'juice',
    'ice coffee'
  ]

  res.send({ list })
})

route.post('/order/drink', (req, res) => {
  const { orderSeq, nickname, drinkSeq, drinkType, optionDesc } = req.body
  
  const data = {
    orderSeq,
    nickname,
    drinkSeq,
    drinkType,
    optionDesc
  }
  res.send(data)
})

route.get('/orders', (req, res) => {

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
})

route.get('/order/people/:orderSeq/:drinkSeq', (req, res) => {
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
})

route.patch('/bill', (req, res) => {
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
})

module.exports = route;