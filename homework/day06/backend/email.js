import {getToday} from "./utils.js"
import nodemailer from 'nodemailer'
import 'dotenv/config'

export function checkValidationEmail(myemail) {
    if(myemail === undefined || myemail.includes("@") === false){
        console.log("에러 발생!!! 이메일을 제대로 입력해주세요!!!")
        return false
     } else {
        return true
     }
}


export function getWelcomeTemplate( { name, number, website}){

    const mytemplate = `
    <html>
        <body>
        <div style="display: flex; flex-direction: column; align-items: center;">
        <div style="width: 500px;">
            <h1>${name}님 가입을 환영합니다!!!</h1>
            <hr />
            <div>이름: ${name}</div>
            <div>전화번호: ${number}</div>
            <div>좋아하는 사이트: ${website}</div>
            <div>가입일: ${getToday()}</div>
        </body>
    </html>
`
    return mytemplate
    // console.log(mytemplate)
}   
 
export async function sendTemplateToEmail(myemail,result){
    // console.log(myemail + "주소로 가입하면 템플릿" + result + "을 전송합니다!!!")
    const EMAIL_USER = process.env.EMAIL_USER
    const EMAIL_PASS = process.env.EMAIL_PASS
    const EMAIL_SENDER = process.env.EMAIL_SENDER
    const FAVORITE_SITE = process.env.FAVORITE_SITE

   const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
            site: FAVORITE_SITE
        }              

    })

   const response = await transporter.sendMail({
        from: EMAIL_SENDER,
        to: myemail,
        subject: "가입을 환영합니다^^",
        html: result
    })
    console.log(response)



}