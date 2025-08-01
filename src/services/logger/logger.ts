import type { ILogger } from "./logger.interface";

export class Logger implements ILogger {
  constructor() {
    console.log(`Service initial: Logger created `);
  }
  log(msg: string) { console.log(msg); }
}