import { Repository } from 'typeorm';

import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { isEmptyObject } from '~utils/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  findUser(user: Partial<User>) {
    if (isEmptyObject(user)) throw new BadRequestException();
    return this.userRepository.findOneBy(user);
  }

  async createUser(user: CreateUserDto) {
    const existUser = await this.findUser({ email: user.email }); // 동일한 이메일을 가진 유저가 존재하는지 체크
    if (existUser) throw new ConflictException('이미 등록된 이메일입니다.');
    return this.userRepository.save(user);
  }
}
