/**
 * @swagger
 * /user:
 *   post:
 *     summary: 회원 가입
 *     tags: [Post]
 *     parameters:
 *          - in: query
 *            name: number
 *            type: int
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          name:
 *                              type: String
 *                              example: 아라111
 *                          email:
 *                              type: String
 *                              example: ala@gmail.com
 *                          personal:
 *                              type: String
 *                              example: 220101-*******
 *                          prefer:
 *                              type: String
 *                              example: https://naver.com
 *                          pwd:
 *                              type: Number 
 *                              example: 01012345678
 */

/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 토큰 인증 요청
 *     tags: [Post]
 *     responses:
 *          200:
 *              description: 성공
 */
