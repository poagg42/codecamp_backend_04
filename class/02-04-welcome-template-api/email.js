import {getToday} from "./utils.js"

export function checkValidationEmail(myemail) {
    if(myemail === undefined || myemail.includes("@") === false){
        console.log("에러 발생!!! 이메일을 제대로 입력해주세요!!!")
        return false
     } else {
        return true
     }
}


export function getWelcomeTemplate( { name, age, school}){

    const mytemplate = `
    <html>
        <body>
            <h1>${name}님 가입을 환영합니다!!!</h1>
            <hr />
            <div>이름: ${name}</div>
            <div>나이: ${age}살</div>
            <div>학교: ${school}</div>
            <div>가입일: ${getToday}</div>
        </body>
    </html>
`
    return mytemplate
    // console.log(mytemplate)
}   
   
export function sendTemplateToEmail(myemail,result){
    console.log(myemail + "주소로 가입하면 템플릿" + result + "을 전송합니다!!!")

}