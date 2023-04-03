/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-30 09:42:27
 * @LastEditTime: 2023-04-04 01:14:08
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\user\user.module.ts
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
