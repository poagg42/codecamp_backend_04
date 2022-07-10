// 커피 목록 조회 API를 요청해주세요.
const getCoffee = () => {
  console.log('index.js 파일의 openMenu 함수 안에서 getCoffee가 실행 됨')
  // 1. 백엔드 서버로 /starbucks API 요청해 커피 데이터를 받는다.

  // 2. 받은 데이터로 createMenuCard 함수를 이용해 메뉴 카드를 모두 만들어주세요.
  createMenuCard({ name: '아메리카노', kcal: 5 }), 
  createMenuCard({ name: '카페라떼', kcal: 10}),
  createMenuCard({ name: '콜드브루', kcal: 15}),
  createMenuCard({ name: '카페모카', kcal: 50}),
  createMenuCard({ name: '돌체라떼', kcal: 500}),
  createMenuCard({ name: '카라멜라떼', kcal: 200}),
  createMenuCard({ name: '바닐라라떼', kcal: 20}),
  createMenuCard({ name: '에스프레소', kcal: 1}),
  createMenuCard({ name: '디카페인' , kcal: 5}),
  createMenuCard({ name: '오트라떼' , kcal: 300})

  
  
}

const createMenuCard = (data) => {
  const menuCardWrapper = document.createElement('div')
  menuCardWrapper.className = 'Menu_Card_Wrapper'

  const menuCardImgBox = document.createElement('div')
  menuCardImgBox.className = 'Menu_Card_ImgBox'

  const menuCardName = document.createElement('div')
  menuCardName.className = 'Menu_Card_Name'
  menuCardName.textContent = data?.name || '메뉴이름'

  const menuCardInfo = document.createElement('div')
  menuCardInfo.className = 'Menu_Card_Info'
  menuCardInfo.textContent = data?.kcal || '칼로리'

  const menuWrapper = document.querySelector('#Menu_Background')
  menuCardWrapper.appendChild(menuCardImgBox)
  menuCardWrapper.appendChild(menuCardName)
  menuCardWrapper.appendChild(menuCardInfo)
  menuWrapper.appendChild(menuCardWrapper)
}
