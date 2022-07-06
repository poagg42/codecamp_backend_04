function getWelcomeTemplate(myEmail,myResidentnumber,myPhone,mySite) {
    return `
        <html>
            <body>
                <h1>코드캠프님 가입을 환영합니다.</h1>
                <hr>
                <div>이메일: ${myEmail}</div>
                <div>주민번호: ${myResidentnumber}</div>
                <div>휴대폰 번호: ${myPhone}</div>
                <div>내가 좋아하는 사이트: ${mySite}</div>
            </body>
        </html>
    `

}

const myEmail = 'support@codebootcamp.co.kr'
const myResidentnumber = '210510-1******'
const myPhone = '000-0000-0000'
const mySite = 'codebootcamp.co.kr'


const result = getWelcomeTemplate(myEmail,myResidentnumber,myPhone,mySite);
console.log(result);