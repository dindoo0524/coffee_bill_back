const express = require('express');
const ctrl = require('./ctrl');
const orderCtrl = require('./orders/ctrl');

const route = express.Router();

route.get('/', ctrl.getBills) 
route.post('/', ctrl.createBill) 
route.patch('/:billSeq', ctrl.checkBill, ctrl.checkAuth, ctrl.finishBill)
route.get('/:billSeq/orders', ctrl.checkBill, orderCtrl.getOrders)
route.post('/:billSeq/orders', ctrl.checkBill, orderCtrl.addOrder)



module.exports = route;

// 필요한 라우터
/**
 * 리스트에 없는 음료 추가하기
 * POST drinks
 * 
 * 추가되어있는 음료를 '주문하기'누른 후 옵션 선택 후 OK
 * POST bills/123/orders
 * 
 * 주문 리스트
 * GET bills/123/orders
 * 
 * 개별 음료 주문한 사람 리스트
 * GET bills/123/orders?drinkSeq=1&drinkType=hot
 * GET bills/123/orders?drinkSeq=1&drinkType=ice
 * 
 * 음료 리스트
 * GET drinks
 */