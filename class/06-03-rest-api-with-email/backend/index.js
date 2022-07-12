// const express = require('express')
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json()) //json파일을 읽게해준다
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.get('/boards', (req, res) => {
  //1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  const result = [
    {number: 1, writer: "철수", title: "제목입니다~~", contents: "내용이에요@@@" },
    {number: 2, writer: "영희", title: "영희 제목입니다~~", contents: "영희 내용이에요@@@" },
    {number: 3, writer: "훈이", title: "훈이 제목입니다~~", contents: "훈이 내용이에요@@@" }
]
  //2. 꺼내온 결과 응답 주기 
  res.send(result)
}) 

  app.post('/boards', (req, res) => {
    console.log(req.body.writer)
    console.log(req.body.title)
    console.log(req.body.contents)
  // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기

  // 2. 저장 결과 응답 주기 
  res.send("게시물 등록에 성공하였습니다!!")
})


app.post('/tokens/phone', (req, res)=> {

  const myphone = req.body.myphone
    // 1. 휴대폰번호 자릿수 맞는지 확인하기
   const isValid = checkValidationPhone(myphone)
    if(isValid === false){
       return
    } 
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken()
 
    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone,mytoken)
    res.send("인증완료!!!")}
)  //1.phone가서 import 2. req 

app.post('/users', (req,res) => {
  const { email, name, age, school } = req.body.myuser
   //1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
   const isValid = checkValidationEmail(email)
   if(isValid === false) return

   //2. 가입환영 템플릿 만들기
   const mytemplate = getWelcomeTemplate({name, age, school})

   //3. 이메일에 가입환영 템플릿 전송하기
   sendTemplateToEmail(email, mytemplate)
    res.send("가입완료!!!")

})

app.listen(3000, () => {
  console.log(`프로그램을 켜는데 성공했어요!!`)
})
