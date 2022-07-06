let final = () => customRegistrationNumber;

// 1. 주민번호 가운데가 "-"로 구성되어야 한다
// 2. 주민번호는 앞 6자리, 뒤 7자리로 구성되어야 한다
// 3. 뒤 7자리 중, 끝 6자리는 *로 변경해서 콘솔에 출력한다
// 4. 함수는 퍼사드 패턴 적용

function checkValidation(renumber){
    if(renumber.length != 14){
        console.log("에러발생!!! 개수를 제대로 입력해주세요!!!")
        return false
    }   else {
        return true
    }
    }


function createTokenOfPhone(myphone) {
    if(myphone.length !== 10 && myphone.length !== 11){
       console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해주세요!!!")
       return false
    } else {
       return true
    }
 }


checkValidation("000101-1234567",14)

function customRegistrationNumber(it) {
    let arr = it.split('');
    return arr.fill("*",it.length-6).join("")
}

console.log("결과", customRegistrationNumber("210510-1010101"))
console.log("결과", customRegistrationNumber("210510-1010101010101"))
console.log("결과", customRegistrationNumber("2105101010101"))

