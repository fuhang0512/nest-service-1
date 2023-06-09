/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-04-03 10:19:23
 * @LastEditTime: 2023-04-04 01:34:00
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\config\typeorm.config.ts
 */
import { TypeOrmModule } from '@nestjs/typeorm';
console.log(process.env);

export const TypeOrmConfig: TypeOrmModule = {
  type: 'mysql', // 数据库类型
  host: process.env['MYSQL_HOST'], // host
  port: process.env['MYSQL_PORT'] as unknown as number, // 端口号
  username: process.env['MYSQL_USERNAME'] as string, // 账号
  password: process.env['MYSQL_PASSWORD'] as string, // 密码
  database: process.env['MYSQL_DATABASE'], // 库名
  connectionLimit: process.env['MYSQL_LIMIT'], // 连接限制
  // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件
  timezone: '+08:00',
  // logger: new DbLogger(), // 配置项添加自定义的log类
  synchronize: true, // 是否将实体类同步到数据库
  retryDelay: 500, // 重试连接数据库间隔
  retryAttempts: 10, // 重试连接数据库的次数
  autoLoadEntities: true, // 如果为true将自动加载实体，forFeature()方法注册的每个实体都将自动添加到配置对象的实体
};
