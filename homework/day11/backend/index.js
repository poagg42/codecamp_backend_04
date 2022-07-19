import  express  from "express"
import { Starbucks } from "./models/starbucks.model.js"
import { Token } from "./models/token.model.js"
import { User } from "./models/user.model.js"
import mongoose from "mongoose"
import cors from "cors"
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'
import { getOpenGraph } from "./opengraph.js"



const app = express()
app.use(cors())
app.use(express.json()) 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

mongoose.connect("mongodb://mini_database:27017/codecamp")


app.post('/user', async function (req,res){

    const find = await Token.findOne({isAuth : true})

    if(find===null) { // 있으면 전체 데이터 반환 없으면 null
        return res.status(422), res.send("에러!! 핸드폰 번호가 인증되지 않았습니다")
    } else { 

    // // 데이터 등록하는 로직(데이터베이스에 저장하기) 
    
    // const user1 = req.body.myuser;
    // 오픈그래프 스크래핑하기
    const openGraph = await getOpenGraph(req.body.prefer)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        personal: req.body.personal,
        prefer: req.body.prefer,
        pwd: req.body.pwd,
        phone: req.body.phone,
        og: openGraph

        // return res.send()
        })
        await user.save()
    
        res.send(user.id)
    
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkValidationEmail(user1.email);
  if (isValid) {
    // 2. 가입환영 템플릿 만들기
    const mytemplate = getWelcomeTemplate(user1);

    // 3. 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail(user1.email, mytemplate);
    res.send("가입완료!!!");

  }

    }
})


app.get('/users', async function (req,res){
    // 데이터 조회하는 로직(데이터베이스에서 꺼내오기)

    const users = await User.find()
    res.send(users);

}) 

app.post('/tokens/phone', async function (req,res){

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
    res.send("핸드폰으로 인증 문자가 전송되었습니다!")

    const token = new Token ({
        token: req.body.mytoken,
        phone: req.body.myphone,
        isAuth : req.body.isAuth
        
          //스키마의 틀만 잡는다.
    })

    await token.save()



}
)

app.patch('/tokens/phone', async function (req,res){
    
    const find = await Token.findOne({phone: req.body.myphone}) // 있으면 전체 데이터 반환 없으면 null
    
    if(find===null){    
        return res.send("false") //updateone에 findone이 내포되어 있다.
    }
                                    // 어떤 데이터베이스에 접근할 것인가, 바꿔주는 값
    const find2 = await Token.findOne({token: req.body.mytoken}) 
    if(find2===null){
        return res.send("false")
    }  

    const find3 = await Token.updateOne({token: req.body.mytoken} , {isAuth : true})
    if(find3 === !null){
        return res.send("true")  // ???? 
    }
       
})

app.get('/starbucks',async function (req,res){
    const starbucks =  await Starbucks.find()

    res.send(starbucks)
})

 

app.listen(3000, () => {
    console.log(`프로그램을 켜는데 성공했어요!!`)
  })