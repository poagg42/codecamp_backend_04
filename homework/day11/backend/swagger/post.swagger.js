/**
 * @swagger
 * /user:
 *   post:
 *     summary: 회원 가입
 *     tags: [User]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                         type: object
 *                         properties:     
 *                               name:
 *                                    type: string
 *                                    required: true
 *                                    example: 아라111
 *                               email:
 *                                    type: string
 *                                    required: true
 *                                    example: poagg42@gmail.com
 *                               personal:
 *                                    type: string
 *                                    required: true
 *                                    example: 210101-1111111
 *                               prefer:
 *                                    type: string
 *                                    required: true
 *                                    example: http://naver.com
 *                               pwd:
 *                                    type: string
 *                                    required: true
 *                                    example: "1234"
 *                               phone:
 *                                    type: string
 *                                    required: true
 *                                    example: "01012345678"
 *
 * 
 *     responses:
 *           200:
 *             description: 조회 성공
 *             content:
 *               application/json:
 *                  schema:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  example: 62d4a7c4a89cbaa0734df055
 * 
 * 
 *           422:
 *             description: 에러!!! 핸드폰 번호가 인증되지 않았습니다
 *           401:
 *             description: 에러!!! 인증번호가 인증되지 않았습니다   
 *                          
 * 
 * 
 */ 

/**
 * 
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 토큰 인증 요청
 *     tags: [Phone]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:   
 *              schema:         
 *                  properties:
 *                        myphone:
 *                              type: string
 *                              required: true
 *                              example: "01012345678"
 *     responses:
 *          200:
 *              description: 성공
 *              content:
 *                application/json: 
 *                   schema: 
 *                       type: array 
 *                       items:
 *                           properties:
 *                               phone:
 *                                    type: string
 *                                    example: "01012345678"
 */
