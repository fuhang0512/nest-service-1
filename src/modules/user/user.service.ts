/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-30 09:42:27
 * @LastEditTime: 2023-04-03 10:15:10
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\user\user.service.ts
 */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private repository: Repository<User>) {}

  async user(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.repository.create({
      data,
    });
  }

  async findOne(username: string | null): Promise<User | undefined> {
    return this.repository.findOne({
      where: {
        username,
      },
    });
  }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
