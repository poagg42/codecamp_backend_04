const aaa = new Date()
console.log(aaa.getFullYear())
console.log(aaa.getMonth() + 1) // month 는 0부터 시작한다.   이것은 사용자 입장

class Monster {
    power = 10   //여기는 const let 안 된다 . 앞에가 생략

    constructor(aaa) {   // 생성자 함수 aaa 매개변수
        this.power = aaa
    }

    attack = () => {
        console.log("공격하자!!")
        console.log("내 공격력은 " + this.power + "야!!!")
           }       //this는 << monster 자기 자신을 말한다.
     run = () => {
        
        console.log("도망가자!!")
    }
}

const mymonster1 = new Monster(10)  //10은 인자 -> aaa에 들어간다. << 하면 mymonster .  << 에 run이라는 기능이 생긴다.
// new Monster()는 몬스터를 만드는 설명서 ,, mymonster가 실제로 만든 몬스터

mymonster1.attack()
mymonster1.run()

const mymonster2 = new Monster(50)    // Monster() << 안에 초기값을 줄 수 있다.  50이 aaa에 들어간다.
mymonster2.attack()
mymonster2.run()