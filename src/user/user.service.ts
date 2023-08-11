import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { isEmptyObject } from '~utils/common';

import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  findUser(findUserDto: FindUserDto) {
    console.log(findUserDto);
    if (isEmptyObject(findUserDto)) throw new BadRequestException();
    return this.userRepository.findOneBy(findUserDto);
  }

  async createUser(createUserDto: CreateUserDto) {
    const existUser = await this.findUser({ email: createUserDto.email }); // 동일한 이메일을 가진 유저가 존재하는지 체크
    if (existUser) throw new ConflictException('이미 등록된 이메일입니다.');
    return this.userRepository.save(createUserDto);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    if (isEmptyObject(updateUserDto) || !updateUserDto._id) throw new BadRequestException();

    return this.userRepository.update({ _id: updateUserDto._id }, updateUserDto);
  }

  deleteUser(deleteUserDto: DeleteUserDto) {
    return this.userRepository.delete(deleteUserDto);
  }
}
