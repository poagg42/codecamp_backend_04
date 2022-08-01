import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findOne({ email }) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create({ email, hashedPassword: password, name, age }) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');
    //   throw new HttpException('이미 등록된 이메일입니다.', HttpStatus.CONFLICT);

    return this.usersRepository.save({ email, password, name, age });
  }

  // async update({ password, updateUserpassword }) {
  //   const myupdate = await this.usersRepository.findOne({
  //     where: { password },
  //   });

  //   const hashedPassword = await bcrypt.hash(updateUserpassword, 10.2);   // 영교님이랑 했던 코드

  //   const newUpdate = {
  //     ...myupdate,
  //     password: hashedPassword,
  //   };

  //   return await this.usersRepository.save(newUpdate);
  // }

  async update({ email, updateUserpassword }) {
    const myupdate = await this.usersRepository.findOne({
      where: { email },
    });

    const hashedPassword = await bcrypt.hash(updateUserpassword, 10.2); // email로 변경한 코드

    const newUpdate = {
      ...myupdate, //
      password: hashedPassword,
    };

    return await this.usersRepository.save(newUpdate);
  }

  async delete({ email }) {
    const result = await this.usersRepository.softDelete({ email });
    return result.affected ? true : false;
  }
}
