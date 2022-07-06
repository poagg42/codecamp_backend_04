function getToday(){

const aaa = new Date()
const yyyy = aaa.getFullYear()
const mm = aaa.getMonth() + 1
const dd = aaa.getDate()
const hh = aaa.getHours()
const mn = aaa.getMinutes()
const ss = aaa.getSeconds()
const today = `오늘은 ${yyyy}년 ${mm}월 ${dd}일 ${hh}:${mn}:${ss}입니다.`

console.log(today)
}

getToday()

