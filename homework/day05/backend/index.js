import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger/config.js'



const app = express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
app.use(express.json());
app.get('/users', (req, res) => {

const personData = [

    { 
        email : "aaa@gmail.com", 
        name : "철수",
        phone : "010-1234-5678",
        personal : "220110-2222222",
        prefer : "https://naver.com"
    }
,
    { 
        email : "Nick@nick.com", 
        name : "Nick",
        phone : "010-1234-5678",
        personal : "220219-0000000",
        prefer : "https://naver.com"
    }
,

{ 
	email : "Judy@judy.com", 
	name : "Judy",
	phone : "010-1234-5678",
	personal : "220219-0000000",
	prefer : "https://naver.com"
}
,
{ 
	email : "Anna@anna.com", 
	name : "Anna",
	phone : "010-1234-5678",
	personal : "220219-0000000",
	prefer : "https://naver.com"
}
,
{ 
	email : "Elsa@elsa.com", 
	name : "Elsa",
	phone : "010-1234-5678",
	personal : "220219-0000000",
	prefer : "https://naver.com"
}

]

  res.send(personData)
})

app.get('/starbucks', (req, res) => {

const coffee = [

    { 
        name: '아메리카노', kcal: 5 
    }

    ,

    { 
        name: '카페라떼', kcal: 10
    }  

    ,

    { 
        name: '콜드브루', kcal: 15 
    }

    ,

    { 
        name: '카페모카', kcal: 50 
    }

    ,

    { 
        name: '돌체라떼', kcal: 500 
    }

    ,

    { 
        name: '카라멜라떼', kcal: 200 
    }

    ,

    { 
        name: '바닐라라떼', kcal: 20
    }

    ,

    { 
        name: '에스프레소', kcal: 1
    }

    ,

    { 
        name: '디카페인', kcal: 5
    }

    ,

    { 
        name: '오트라떼', kcal: 300
    }

]

res.send(coffee)

})





app.post('/starbucks', (req, res) => {
    console.log(req.body)

    
    
  // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기

  // 2. 저장 결과 응답 주기 
  res.send("게시물 등록에 성공하였습니다!!")
})



app.listen(3000, () => {
  console.log(`프로그램을 켜는데 성공했어요`)
})
