export function checkValidationResident(residentnumber,count){
    if(residentnumber.length !==14 ){
    console.log("에러 발생!!! 개수를 제대로 입력해주세요!!!")
    // return false
    //  } else {
    //     return true

    return;
    }
} 

export function getTokenf(counta){

    if(counta == undefined){
        console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
        return
       } else if(counta <= 0 || counta > 6) {
        console.log("에러 발생!!! 갯수를 제대로 입력해주세요!!!");
        return
       }   

       const result = String(Math.floor(Math.random() * 10 ** counta)).padStart(counta,"*");
       console.log(result);
       
}
export function getTokens(countb){

        if(countb == undefined){
            console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
            return
           } else if(countb <= 0 || countb > 7) {
            console.log("에러 발생!!! 갯수를 제대로 입력해주세요!!!");
            return
           }   
    
           const result = String(Math.floor(Math.random() * 10 ** countb)).padStart(countb,"*");
           console.log(result); 

}
    
function customRegistrationNumber(){
    console.log(resitoken + "-" + resitoken2);
    }

// export function getToken(count){

//     if(count == undefined){
//         console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
//         return
//        } else if(count <= 0 || count > 14) {
//         console.log("에러 발생!!! 갯수를 제대로 입력해주세요!!!");
//         return
//        }   

//        const result = String(Math.floor(Math.random() * 10 ** count)).padStart(count,"*");
//        console.log(result);
       
//     }




