/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-10-13 10:20:58
 * @LastEditTime: 2023-04-04 02:09:11
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\config\env.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

const isProd = process.env.NODE_ENV === 'production ';
function parseEnv() {
  const localEnv = path.resolve('.env');
  const prodEnv = path.resolve('.env.prod');

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('缺少环境配置文件');
  }

  const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;
  config({ path: filePath });
  console.log(filePath);

  return { path: filePath };
}

export default parseEnv();
