import { Args, Int, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.services';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard) // << 인가 처리를 하기 위해서, 검증을 시도하고 성공하면 아래 로직 실행
  @Query(() => String)
  fetchUser(
    @Context() context: any, //
  ) {
    // 유저 정보 꺼내오기
    console.log(context.req.user);
    console.log('fetchUser 실행 완료!!');
    return 'fetchUser가 실행되었습니다!';
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchLoginUser(@Args('email') email: string) {
    return this.usersService.findOne({ email });
  }

  // @Mutation(() => User)
  // async updateUserPwd(
  //   @Args('password') password: string,
  //   @Args('updateUserPassword') updateUserpassword: string,
  // ) {
  //   return this.usersService.update({ password, updateUserpassword });   // 영교님이랑 했던 코드
  // }

  @Mutation(() => User)
  async updateUserPwd(
    @Args('email') email: string,
    @Args('updateUserPassword') updateUserpassword: string,
  ) {
    return this.usersService.update({ email, updateUserpassword });
  }

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10.2);
    console.log(hashedPassword);
    return this.usersService.create({ email, hashedPassword, name, age });
  }

  @Mutation(() => Boolean)
  deleteLoginUser(
    @Args('email') email: string, //
  ) {
    return this.usersService.delete({ email });
  }
}
