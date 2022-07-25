import { append } from "cheerio/lib/api/manipulation";



class ValidateNumber {
    checkNumber = (req, res) => {
        const find = await Token.findOne({phone: req.body.phone})
        console.log(find)
        if(find===null) { // 있으면 전체 데이터 반환 없으면 null
            res.status(422); 
            res.send("에러!! 핸드폰 번호가 인증되지 않았습니다");
        } 
        
        if (find.isAuth === false){
            
            res.status(422);
            res.send("에러!! 인증번호가 인증되지 않았습니다")
        } else if(find.isAuth === true){
        
        function maskingNumber(Number) {
            let arr = Number.split("");
            arr = arr.fill("*", 8).toString().replace(/,/g, "");
            return arr;
        }
    
        const newPersonal = maskingNumber(req.body.personal)
        // // 데이터 등록하는 로직(데이터베이스에 저장하기) 
        
        // const user1 = req.body.myuser;
        // 오픈그래프 스크래핑하기
        const openGraph = await getOpenGraph(req.body.prefer)
    
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            personal: newPersonal,
            prefer: req.body.prefer,
            pwd: req.body.pwd,
            phone: req.body.phone,
            og: openGraph
    
            // return res.send()
            })
            await user.save()
            const userId = await Token.findOne({phone: phone});
            res.send(userId._id)
       
            
      // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
      const isValid = checkValidationEmail(email);
      if (isValid===false) return; 
        // 2. 가입환영 템플릿 만들기
        const mytemplate = getWelcomeTemplate({
            name,
            phone,
            prefer,
        });
    
        // 3. 이메일에 가입환영 템플릿 전송하기
        sendTemplateToEmail(email, mytemplate);
        res.send("가입완료!!!");
    
      }
    
        
    }

    findUser = (req, res) => {
            // 데이터 조회하는 로직(데이터베이스에서 꺼내오기)

    const users = await User.find()
    res.send(users);
    }
}


