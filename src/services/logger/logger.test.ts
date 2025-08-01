import { Logger } from './logger';
import type { ILogger } from './logger.interface';

describe('Logger Service', () => {
  let logger: ILogger;

  beforeEach(() => {
    logger = new Logger();
  });

  it('should be instantiable', () => {
    expect(logger).toBeInstanceOf(Logger);
  });

  it('should log messages without throwing', () => {
    expect(() => logger.log('test message')).not.toThrow();
  });
});
