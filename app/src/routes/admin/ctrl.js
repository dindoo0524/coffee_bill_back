const Drink = require('../../models/Drink')

const getBills = async (req, res) => {
  try {
    // const rows = await Drink.getDrinks();
    const bills = [
      {
        id: 1,
        billName: '개발팀 커피타임',
        name: '박수현',
        billStatus: '1',
        drinkList: [
          {
            drinkName: '아메리카노',
            drinkType: 'HOT', // ICE
            options: '세상에서 제일 뜨겁게'
          },
          {
            drinkName: '아메리카노',
            drinkType: 'ICE',
            options: '세상에서 제일 차갑게'
          },
          {
            drinkName: '아메리카노',
            drinkType: 'HOT',
            options: ''
          },
          {
            drinkName: '초코라떼',
            drinkType: 'HOT',
            options: ''
          }
        ]
      },
      {
        id: 2,
        billName: '디자인팀 커피타임',
        name: '박수현',
        billStatus: '1',
        drinkList: [
          {
            drinkName: '아메리카노',
            drinkType: 'HOT', // ICE
            options: '세상에서 제일 뜨겁게'
          },
          {
            drinkName: '아메리카노',
            drinkType: 'ICE',
            options: '세상에서 제일 차갑게'
          },
          {
            drinkName: '아메리카노',
            drinkType: 'HOT',
            options: ''
          },
          {
            drinkName: '초코라떼',
            drinkType: 'HOT',
            options: ''
          }
        ]
      }
            
    ]
    res.json({bills})
  } catch (err) {
    console.error(err)
  }
}

const updateBillStatus = async (req, res) => {
  const { billSeq } = req.params   
  const { billStatus, reason } = req.body   
  
  try {
    // const seq = await Drink.addDrink(drinkName)
    const data = { billSeq, billStatus, reason }
    res.json(data)
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getBills,
  updateBillStatus
}