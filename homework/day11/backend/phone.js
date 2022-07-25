import coolsms from "coolsms-node-sdk"
import 'dotenv/config'
  
export function checkValidationPhone(myphone) {
   if(myphone.length !== 10 && myphone.length !== 11){
      console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해주세요!!!")
      return false
   } else {
      return true
   }
}
 
export function getToken(){

   const aaa = 6
   if(aaa === undefined){
      console.log("에러 발생!!! 갯수를 제대로 입력해주세요!!!")
      return
   } else if(aaa <= 0){
      console.log("에러 발생!!! 갯수가 너무 적습니다!!!")
      return 
   } else if(aaa > 10){
      console.log("에러 발생!!! 갯수가 너무 많습니다!!!")
      return
   }
   const result = String(Math.floor(Math.random() * 10 ** aaa)).padStart(aaa,"0")
   return result
   // console.log(result)
}

export async function sendTokenToSMS(myphone, result) {
   const SMS_KEY = process.env.SMS_KEY
   const SMS_SECRET = process.env.SMS_SECRET
   const SMS_SENDER = process.env.SMS_SENDER

   const mysms = coolsms.default
   const messageService = new mysms(SMS_KEY, SMS_SECRET)
   const response = await messageService.sendOne ({
      to: myphone,
      from: SMS_SENDER, 
      text: `[코드캠프] 안녕하세요?! 요청하신 인증번호는 [${result}] 입니다.`
   })
}

// console.log(myphone + "번호로 인증번호" + result + "을 전송합니다!!!")
