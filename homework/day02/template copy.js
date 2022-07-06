function getWelcomeTemplate(myUser) {
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

const myUser = {

    myEmail: 'support@codebootcamp.co.kr',
    myResidentnumber : '210510-1******',
    myPhone : '000-0000-0000',
    mySite : 'codebootcamp.co.kr',

};

getWelcomeTemplate(myUser)
console.log(getWelcomeTemplate(myUser))