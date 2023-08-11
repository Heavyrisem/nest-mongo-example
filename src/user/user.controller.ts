import { plainToInstance } from 'class-transformer';
import { ObjectId } from 'mongodb';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findUser(@Query() findUserDto: FindUserDto) {
    const foundUser = await this.userService.findUser(findUserDto);
    if (!foundUser) throw new NotFoundException('일치하는 유저가 없습니다.');
    return foundUser;
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Post('update')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    if (!updateUserDto._id) throw new BadRequestException();

    const foundUser = await this.userService.findUser({ _id: updateUserDto._id });
    if (!foundUser) throw new NotFoundException('일치하는 유저가 없습니다.');

    return this.userService.updateUser(updateUserDto);
  }

  @Delete()
  async deleteUser(@Body() deleteUserDto: DeleteUserDto) {
    const foundUser = await this.userService.findUser(deleteUserDto);
    if (!foundUser) throw new NotFoundException('일치하는 유저가 없습니다.');

    return this.userService.deleteUser(deleteUserDto);
  }
}
