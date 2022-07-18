import express from 'express'
import { Cashservice } from './cash.js'

const app = express()

// 상품 구매하기
app.post("/products/buy", (req, res) => {
    // 1. 가진 돈 검증하는 코드 (대략 10줄 정도 => 2줄로 줄었다.)
    const cashService = new Cashservice()
    const hasMoney = cashService.checkValue()

    // 2. 판매여부 검증하는 코드 (대략 10줄 정도 => 2줄)
    const productService = new ProductService()
    const isSoldout = productService.checkSoldout()

    // 3. 상품 구매하는 코드
    if(hasmoney && !isSoldout){
        res.send("상품 구매 완료!!")
    }
})

// 상품 환불하기
app.post("/products/refund", (req, res) => {
 // 2. 판매여부 검증하는 코드 (대략 10줄 정도 => 2줄)
    const productService = new ProductService()
    const isSoldout = productService.checkSoldout()

    // 2. 상품 환불하는 코드
    if(isSoldout) {
        res.send("상품 환불 완료!!")
    }
    
})


app.listen(3000)