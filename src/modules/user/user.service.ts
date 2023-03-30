/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-30 09:42:27
 * @LastEditTime: 2023-03-30 16:47:44
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\user\user.service.ts
 */
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async user(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data,
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
