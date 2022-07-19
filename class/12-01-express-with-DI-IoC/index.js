import express from 'express'
import { BoardController } from './mvc/controllers/services/board.controller.js'
import { CouponController } from './mvc/controllers/coupon.controller.js'
import { ProductController } from './mvc/controllers/product.controller.js'
import { CashService } from './mvc/controllers/services/cash.js'
import { ProductService } from './mvc/controllers/services/product.js'
import { PointService } from './mvc/controllers/services/point.js'


const app = express()

// 내가 만들어 볼 것
// 게시판 API 04-02-rest-api-with-express-board 
//게시판 등록하기, 조회하기 
//board.controller 등으로 바꿔서 api를 만들어보자
//처음에는 service없이 controller만 분리를 해보자

//서비스 의존성

const cashService = new CashService()
const productService = new ProductService() // new 한 번으로 모든 곳에서 재사용이 가능(싱글톤 패턴) 할 때마다 new하는 것이 아니라 한 개 만들어놓고 돌려쓴다.
const pointService = new PointService() // 쿠폰 구매 방식이 포인트결제로 변경됨

//상품 API
const productController = new ProductController(cashService, productService)
app.post("/products/buy", productController.buyProduct) // 상품 구매하기
app.post("/products/refund", productController.refundProduct) // 상품 환불하기

//쿠폰(상품권) API
const couponController = new CouponController(pointService)
app.post("/coupons/buy", couponController.buyCoupon) // 쿠폰(상품권) 구매하기 API

//위에가 중요하다
//게시판 API


const boardController = new BoardController()
app.get('/boards', boardController.fetchBoards)
app.post('/boards', boardController.createBoard)





app.listen(3000)