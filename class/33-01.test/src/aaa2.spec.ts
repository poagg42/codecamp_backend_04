import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appService: AppService;
  let appController: AppController;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService); // 괄호에 넣어야 app.controller에 있는 appService에 들어간다. 이 작업을 대신 해주는 것이 nestjs -> 제어의 역전(inversion of controll) // 여기서는 nest를 쓰는 것이 아니여서 직접 의존성을 주입해야 한다.
  });
  //appcontroller를 테스트한다.

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함!!!', () => {
      const result = appController.getHello();
      expect(result).toBe('Hello World!');
    });
  }); // 그 중에서도 getHello를 테스트한다.
  // API의 작동만 테스트하는 것이 아니라 부가적인 기능들을 테스트한다.
  // 여러 단위는 it
  //   describe('fetchBoards', () => {
  //   appController.fetchBoards();
  //   });

  //   describe('createBoard', () => {
  //   appController.createBoard();
  //   })
});
