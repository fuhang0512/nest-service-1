import { AnyExceptionFilter } from './common/filters/any-exception.filter';
/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-28 18:29:44
 * @LastEditTime: 2023-04-04 02:08:37
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\app.module.ts
 */
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { LoggingModule } from './modules/logging/logging.module';
import { LoggingService } from './modules/logging/logging.service';
import { WinstonConfig } from './common/config/winston.config';
import { Logging } from './modules/logging/entities/logging.entity';
import { TypeOrmConfig } from './common/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import envConfig from './common/config/env';

// 环境变量加载
const envFilePath = ['env/.env'];
if (process.env.NODE_ENV) {
  envFilePath.unshift(`env/.env.${process.env.NODE_ENV}`);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forFeature([Logging]),
    // 连接MySQL
    TypeOrmModule.forRoot(TypeOrmConfig),
    WinstonModule.forRoot(WinstonConfig),
    AuthModule,
    UserModule,
    LoggingModule,
  ],
  controllers: [],
  providers: [
    LoggingService,
    // 应用拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // 应用全局过滤器
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
