// // public, private, protected, readonly

// // 1.public
// class Aaa1 {
//     constructor(public mypower){
//         // this.mypower = mypower; // public, private, readonly 한 개만 포함되면 자동으로 셋팅 된다.
//     }
//   ggg(){
//    console.log(this.mypower) // 안에서 접근 가능
//    this.mypower = 10 // 안에서 수정 가능
//   }
// }

// class Aaa2 extends Aaa1 {
//   ggg() {
//     console.log(this.mypower) // 자식이 접근 가능
//     this.mypower = 10  // 자식이 수정 가능

//   }
// }
// const aaaa = new Aaa2(50) // Aaa2에 들어가지 않고 자동으로 맨 위에 있는 Aaa1() << 에 들어간다
// console.log(aaaa.mypower) // 밖에서 접근 가능
// aaaa.mypower = 10 // 밖에서 수정도 가능

// 2. protected
// class Aaa1 {
//     constructor(protected mypower){
//         // this.mypower = mypower; // public,protected, private, readonly 한 개만 포함되면 자동으로 셋팅 된다.
//     }
//   ggg(){
//    console.log(this.mypower) // 안에서 접근 가능
//    this.mypower = 10 // 안에서 수정 가능
//   }
// }

// class Aaa2 extends Aaa1 {
//   ggg() {
//     console.log(this.mypower) // 자식이 접근 가능
//     this.mypower = 10  // 자식이 수정 가능

//   }
// }
// const aaaa = new Aaa2(50) // Aaa2에 들어가지 않고 자동으로 맨 위에 있는 Aaa1() << 에 들어간다
// console.log(aaaa.mypower) // 밖에서 접근 불가
// aaaa.mypower = 10 // 밖에서 수정 불가

// 3. private
// class Aaa1 {
//   constructor(private mypower) {
//     // this.mypower = mypower; // public,protected, private, readonly 한 개만 포함되면 자동으로 셋팅 된다.
//   }
//   ggg() {
//     console.log(this.mypower); // 안에서 접근 가능
//     this.mypower = 10; // 안에서 수정 가능
//   }
// }

// class Aaa2 extends Aaa1 {
//   ggg() {
//     console.log(this.mypower); // 자식이 접근 가능
//     this.mypower = 10; // 자식이 수정 가능
//   }
// }
// const aaaa = new Aaa2(50); // Aaa2에 들어가지 않고 자동으로 맨 위에 있는 Aaa1() << 에 들어간다
// console.log(aaaa.mypower); // 밖에서 접근 불가
// aaaa.mypower = 10; // 밖에서 수정 불가

// // 4. readonly
// class Aaa1 {
//   constructor(readonly mypower) {
//     // this.mypower = mypower; // public,protected, private, readonly 한 개만 포함되면 자동으로 셋팅 된다.
//   }
//   ggg() {
//     console.log(this.mypower); // 안에서 접근 가능
//     this.mypower = 10; // 안에서 수정 가능
//   }
// }

// class Aaa2 extends Aaa1 {
//   ggg() {
//     console.log(this.mypower); // 자식이 접근 가능
//     this.mypower = 10; // 자식이 수정 가능
//   }
// }
// const aaaa = new Aaa2(50); // Aaa2에 들어가지 않고 자동으로 맨 위에 있는 Aaa1() << 에 들어간다
// console.log(aaaa.mypower); // 밖에서 접근 불가
// aaaa.mypower = 10; // 밖에서 수정 불가
