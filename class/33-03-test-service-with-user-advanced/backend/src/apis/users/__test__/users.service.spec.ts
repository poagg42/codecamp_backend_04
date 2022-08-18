import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

class MockUsersRepository {
  mydb = [{ email: 'a@a.com', password: '0000', name: '짱구', age: 8 }];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>; // 이것을 알기 위해 generic, utility type을 알아야 한다.

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: MockRepository<User>;

  beforeEach(async () => {
    const usersModule: TestingModule = await Test.createTestingModule({
      //   imports: [TypeORM.....],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService); // new UsersService(UsersRepository)
    usersRepository = usersModule.get<MockRepository<User>>(
      getRepositoryToken(User),
    );
  });

  // describe("findOne", () => {})
  // usersService.findOne() 테스트

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기!!', async () => {
      const usersRepositorySpyFindOne = jest.spyOn(usersRepository, 'findOne');
      const usersRepositorySpySave = jest.spyOn(usersRepository, 'save');

      const myData = {
        email: 'a@a.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };

      try {
        await usersService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }

      expect(usersRepositorySpyFindOne).toBeCalledTimes(1);
      expect(usersRepositorySpySave).toBeCalledTimes(0);
    });

    it('회원 등록 잘 됐는지 검증!!', async () => {
      const usersRepositorySpyFindOne = jest.spyOn(usersRepository, 'findOne');
      const usersRepositorySpySave = jest.spyOn(usersRepository, 'save');

      const myData = {
        email: 'bbb@bbb.com',
        hashedPassword: '1234',
        name: '철수',
        age: 13,
      };

      const result = await usersService.create({ ...myData });
      expect(result).toStrictEqual({
        email: 'bbb@bbb.com',
        password: '1234',
        name: '철수',
        age: 13,
      });

      expect(usersRepositorySpyFindOne).toBeCalledTimes(1);
      expect(usersRepositorySpySave).toBeCalledTimes(1);
    });
  });
});
