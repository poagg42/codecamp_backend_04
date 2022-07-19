export class CouponController{
    constructor(moneyService) { //여기서 캐시 서비스를 받아온다.
        this.moneyService = moneyService  /// this. moneyService(qqq로 해도 된다.)는 우리가 index.js 에서 주입받은 cashService
    }

    buyCoupon = (req, res) => { 
        // 1. 가진돈 검증하는 코드 (10줄 => 2줄)
        // const cashService = new CashService()
        const hasMoney = moneyService.checkValue()

    }   // 2. 쿠폰 구매하는 코드
        if(hasMoney) {
            res.send("쿠폰 구매 완료!!")
        }
}