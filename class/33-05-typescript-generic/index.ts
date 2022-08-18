// 1. 문자
function getString(arg: string): string {
  return arg;
}
const result1 = getString("철수");

// 2. 숫자

function getNumber(arg: number): number {
  return arg;
}
const result2 = getNumber(8);

// 3. any 타입

function getAny(arg: any): any {
  return arg;
}
const result31 = getAny("철수");
const result32 = getAny(8);
const result33 = getAny(true);

function getAnyReverse(arg1: any, arg2: any, arg3: any): [any, any, any] {
  return [arg3, arg2, arg1];
}
const result34 = getAnyReverse("철수", "다람쥐초등학교", 8);

// 4. generic 타입    // generic이 any와 다른 점 -> 들어오는 것은 any처럼 막 들어온다. 다른 점은 들어온 순간 이 들어온 데이터를 type으로 치겠다. Type을 내가 만든다.

function getGeneric<MyType>(arg: MyType): MyType {
  return arg;
}
const result41 = getGeneric("철수");
const result42 = getGeneric(8);
const result43 = getGeneric(true);

// prettier-ignore
function getGenericReverse<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {  //원래는 뭔지 모르지만 철수가 들어가고 나서부터 MyType1은 string이 된다. -> type이 예측이 된다.
  return [arg3, arg2, arg1];
}
const result44 = getGenericReverse("철수", "다람쥐초등학교", 8);

// prettier-ignore
function getGenericReverseT<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {  //원래는 뭔지 모르지만 철수가 들어가고 나서부터 T1은 string이 된다. -> type이 예측이 된다.
    return [arg3, arg2, arg1];
  }
const result45 = getGenericReverseT("철수", "다람쥐초등학교", 8);

// prettier-ignore
function getGenericReverseTUV<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {  //원래는 뭔지 모르지만 철수가 들어가고 나서부터 T는 string이 된다. -> type이 예측이 된다.
    return [arg3, arg2, arg1];
  }
const result46 = getGenericReverseTUV<string, string, number>(
  "철수",
  "다람쥐초등학교",
  8
);

// 타입을 명시하지 않으면 들어간 타입이 그냥 추론된다.
// 함수 뒤에 타입을 명시하면 타입이 정해진다. ex) <string,string,number> => 뒤가 string string number만 가능
