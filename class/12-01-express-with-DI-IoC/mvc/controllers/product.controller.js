export class ProductController{
    constructor(moneyService, productService) {
        this.moneyService = moneyService
        this.productService = productService

    }

    buyProduct = (req, res) => {
        // 1. 가진 돈 검증하는 코드 (대략 10줄 정도 => 2줄로 줄었다.)
        // const cashService = new Cashservice()
        const hasMoney = this.moneyService.checkValue()
    
        // 2. 판매여부 검증하는 코드 (대략 10줄 정도 => 2줄)
        // const productService = new ProductService()
        const isSoldout = this.productService.checkSoldout()
    
        // 3. 상품 구매하는 코드
        if(hasmoney && !isSoldout){
            res.send("상품 구매 완료!!")
        }
    }

    refundProduct =  (req, res) => {
        // 2. 판매여부 검증하는 코드 (대략 10줄 정도 => 2줄)
        //    const productService = new ProductService()
           const isSoldout = productService.checkSoldout()
       
           // 2. 상품 환불하는 코드
           if(isSoldout) {
               res.send("상품 환불 완료!!")
           }
           
       }
}