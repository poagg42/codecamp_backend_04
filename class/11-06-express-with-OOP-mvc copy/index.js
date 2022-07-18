import express from 'express'
import { BoardController } from './mvc/controllers/services/board.controller.js'
import { CouponController } from './mvc/controllers/coupon.controller.js'
import { ProductController } from './mvc/controllers/product.controller.js'


const app = express()

// 내가 만들어 볼 것
// 게시판 API 04-02-rest-api-with-express-board 
//게시판 등록하기, 조회하기 
//board.controller 등으로 바꿔서 api를 만들어보자
//처음에는 service없이 controller만 분리를 해보자

//상품 API
const productController = new ProductController()
app.post("/products/buy", productController.buyProduct) // 상품 구매하기
app.post("/products/refund", productController.refundProduct) // 상품 환불하기

//쿠폰(상품권) API
const couponController = new CouponController()
app.post("/coupons/buy", couponController.buyCoupon) // 쿠폰(상품권) 구매하기 API

//게시판 등록하기, 조회하기

const boardController = new BoardController()
app.get('/boards', boardController.fetchBoards)
app.post('/boards', boardController.createBoard)

app.listen(3000)