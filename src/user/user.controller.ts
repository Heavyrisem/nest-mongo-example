import { Body, Controller, Get, NotFoundException, Post, Query } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findUser(@Query() user: Pick<User, 'email'>) {
    console.log(user);
    const foundUser = await this.userService.findUser(user);
    if (!foundUser) throw new NotFoundException('일치하는 유저가 없습니다.');

    return foundUser;
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
