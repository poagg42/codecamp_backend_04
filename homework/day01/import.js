import { checkValidationResident,getTokenf,getTokens,customRegistrationNumber } from "./resident-registration-number.js";

checkValidationResident("961015-1111111", 14)
// 2. 주민번호 토큰 만들기 

const resitoken = getTokenf(6)
const resitoken2 = getTokens(7)


customRegistrationNumber("210510-1010101")
customRegistrationNumber("210510-1010101010101")
customRegistrationNumber("2105101010101")