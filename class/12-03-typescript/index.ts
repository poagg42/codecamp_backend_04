//타입 추론
let aaa = "안녕하세요",
  aaa = 3;

//타입 명시

let bbb: string = "반갑습니다";
bbb = 10;

// 타입 명시가 필요한 상황

let ccc: number | string = 1000;
ccc = "1000원";

// 숫자 타입

let ddd: number = 10;
ddd = "철수";

// 불린 타입
let eee: boolean = true;
eee = false;
eee = "false"; // 자바스크립트에서는 가능한데 문자열 안에 뭐가 들어있으면 true로 작동함
// 우리가 원하는 것은 false인데 대형사고가 날 수 있다.

// 배열 타입
let fff: number[] = [1, 2, 3, 4, 5, "안녕하세요"];
let ggg: string[] = ["철수", "영희", "훈이", 10];
let hhh = ["철수", "영희", "훈이", 10]; // (string | number)[]  배열 타입으로 추론됨

//  객체 타입
interface IProfile {
  name: string;
  age: number | string;
  school: string;
  hobby?: string; // ?는 있을 수도 있고 없을 수도 있다. 를 뜻한다.
}
const profile: IProfile = {
  name: "철수",
  age: 8,
  school: "다람쥐초등학교",
};

profile.age = "8살";
profile.hobby = "수영"; // 처음에는 없는데 나중에 추가하고 싶다.

// 함수타입
const add = (money1: any, money2: number, unit: string): string => {
  //any는 뭐든 다 넣을 수 있다 -> 자바스크립트  // 함수를 통과시킨 결과(리턴)의 타입까지 설정할 수 있다.
  return money1 + money2 + unit;
};

const result = add(1000, 2000, "원");
