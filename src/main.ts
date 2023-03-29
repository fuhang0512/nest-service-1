/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-28 18:29:44
 * @LastEditTime: 2023-03-30 00:46:57
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\main.ts
 */
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
// import { Logger } from 'winston';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );
  // 管道
  app.useGlobalPipes(new ValidationPipe());

  // 设置swagger文档相关配置
  const config = new DocumentBuilder()
    .setTitle('Naive Admin 后台管理系统接口文档')
    .setDescription('后台管理系统接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
