/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-30 01:18:43
 * @LastEditTime: 2023-03-30 01:44:59
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\utils\utils.ts
 */
import { Request } from 'express';

export const getReqMainInfo: (req: Request) => {
  [prop: string]: any;
} = (req) => {
  const { query, headers, url, method, body } = req;

  // 获取 IP
  const xRealIp = headers['X-Real-IP'];
  const xForwardedFor = headers['X-Forwarded-For'];
  const { ip: cIp } = req;
  //   const { remoteAddress } = connection || {};
  const ip = xRealIp || xForwardedFor || cIp;

  return {
    url,
    host: headers.host,
    ip,
    method,
    query,
    body,
  };
};
