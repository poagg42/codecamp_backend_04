const apple = 3
const banana = 2

console.log("철수는 사과를 " + apple + "개, " + "바나나를 " + banana + "개 가지고 있습니다") //여기서 apple은 변수 -> 파란색
console.log(`철수는 사과를 ${apple}개, 바나나를 ${banana}개 가지고 있습니다`)

//여기서는 apple과 banana가 문자열로 취급
//바꾸려면 문자열을 $로 감싼다}

function getWelcomeTemplate({name, age, school, createdAt}){
    const mytemplate = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}살</div>
                <div>학교: ${school}</div>
                <div>가입일: ${createdAt}</div>
            </body>
        </html>
    `
    console.log(mytemplate)
}

const myname = "영희"
const myage = 12
const myschool = "토끼초등학교"
const mycreatedAt ="2020-01-02"  //얘네는 브라우저에서 입력하는 입력창이 될 것이다.

getWelcomeTemplate({name, age, school,createdAt}) //이 인자들은 브라우저에서 받은 인자다 라고 생각한다.

