interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// type AAA = {
//   name: string;
//   age: number;
//   school: string;
//   hobby?: string;
// };

// // 선언 병합
// interface IProfile {
//   apple: number;
// }

// const bbb: IProfile = {}

//
//
// 1. Partial 타입
type MyType1 = Partial<IProfile>; // ? 있어도 되고 없어도 되는 타입

// 2. Required 타입
type MyType2 = Required<IProfile>; // 모두 필수로 있어야 하는 타입

// 3. Pick 타입
type MyType3 = Pick<IProfile, "name" | "age">; // 중에서 고르는 타입
// 4. Omit 타입
type MyType4 = Omit<IProfile, "school">; // 빼내고 싶은 것만 빼내는 타입

// 5. Record 타입
type ZZZ = "aaa" | "qqq" | "rrr"; // union 타입 .. 이것 또는 저것

type MyType5 = Record<ZZZ, string>; // 각각의 레코드에 대해서 스트링으로 해주세요.

// 만약, union 타입을 만드려면...??

// const zzz: ZZZ; // "aaa" | "qqq" | "rrr"
// zzz === "";

// const qqq: keyof IProfile; // "name" | "age" | "school" | "hobby"  union 타입으로 만들고 싶으면 앞에 keyof 만 붙여서 만든다.
// qqq === "";
