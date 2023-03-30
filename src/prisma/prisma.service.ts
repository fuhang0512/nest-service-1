/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2023-03-30 11:22:35
 * @LastEditTime: 2023-03-30 11:23:20
 * @LastEditors: 
 * @FilePath: \nest-service\src\prisma\prisma.service.ts
 */
import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
