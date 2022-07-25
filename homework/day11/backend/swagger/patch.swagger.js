/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 회원 가입
 *     tags: [Phone]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                         token:
 *                            type: string
 *                            require: true
 *                            example: "123456"
 *                         phone:
 *                            type : string
 *                            require: true
 *                            example: "01012345678"
 * 
 *     responses:
 *           200:
 *             description: 조회 성공
 *           422:
 *             description: 인증번호가 다릅니다
 *                                
 *                          
 *                          
 * 
 * 
 */ 