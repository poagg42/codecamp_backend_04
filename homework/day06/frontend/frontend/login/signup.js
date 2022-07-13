// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  console.log('인증 번호 전송')
  // 1. 입력한 휴대폰번호 가져오기
  const myphone1 = document.getElementById('PhoneNumber01').value;
  const myphone2 = document.getElementById('PhoneNumber02').value;
  const myphone3 = document.getElementById('PhoneNumber03').value;
  console.log('나의 핸드폰번호: ', myphone1 + myphone2 + myphone3)
}   // 2. 해당 휴대폰번호로 인증번호API 요청하기
        axios.post('http://localhost:3000/tokens/phone', {
            myphone: myphone1 + myphone2 + myphone3,
          })
          .then((res) => {
            console.log(res);
          });

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log('회원 가입 이메일 전송')
}
