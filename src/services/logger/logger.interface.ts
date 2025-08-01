import { createDecorator } from "../../base/createDecorator";

export interface ILogger {
  log(msg: string): void;
}
/** 创建Logger服务的装饰器，并以logger字符串作为key，存在serviceIds，value是构造函数，这里会返回构造函数 */
export const ILogger = createDecorator<ILogger>('logger');