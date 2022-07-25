
/**
 * @swagger
 * 
 *  /users:
 * 
 *   get:
 *     summary: 회원 목록 조회
 *     tags: [User]
 *     responses:
 *          200:
 *              description: 성공
 * 
 *              content:
 *                application/json:
 *                    schema:
 *                     type: array
 *                     items:
 *                         properties:
 *                          og:
 *                              type: object
 *                              example: {"title": "네이버","description": "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요","image": "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png"} 
 *                          _id:
 *                              type: number
 *                              example: 62d56578b70fbf786f866f56
 *                          name:
 *                              type: string
 *                              example: 아라111
 *                          email:
 *                              type: string
 *                              example: ala@gmail.com
 *                          personal:
 *                              type: number 
 *                              example: 220101-1111111
 *                          prefer:
 *                              type: string
 *                              example: "https://naver.com"
 *                          pwd:
 *                              type: string
 *                              example: 1234
 *                          phone:
 *                              type: string
 *                              example: "01012345678"
 * 
 */

/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 스타벅스 커피 목록 조회
 *     tags: [Starbucks]
 *     responses:
 *          200:
 *              description: 성공
 * 
 *              content:
 *                application/json:
 *                    schema:
 *                     type: array
 *                     items:
 *                         properties:
 *                          name:
 *                              type: string
 *                              example: 아이스 카페 아메리카노
 *                          img:
 *                              type: string
 *                              example: "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110563]_20210426095937808.jpg"
 */