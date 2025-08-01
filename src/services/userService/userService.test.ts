import { UserService } from './userService';
import type { ILogger } from '../logger/logger.interface';

describe('UserService', () => {
  let logger: ILogger;
  let service: UserService;

  beforeEach(() => {
    logger = { log: jest.fn() };
    service = new UserService('test-location', logger);
  });

  it('should instantiate and not be logged in by default', () => {
    expect(service.hasLogin).toBe(false);
  });

  it('should login and logout correctly', () => {
    service.login();
    expect(service.hasLogin).toBe(true);
    service.logout();
    expect(service.hasLogin).toBe(false);
  });

  it('should call logger.log on login and logout', () => {
    service.login();
    service.logout();
    expect(logger.log).toHaveBeenCalledWith(expect.stringContaining('Hello DI!'));
    expect(logger.log).toHaveBeenCalledWith('Goodbye DI!');
  });

  it('should throw if getUserInfo called before bootstrap', () => {
    expect(() => service.getUserInfo()).toThrow('UserInfo not ready');
  });

  it('should resolve userInfo after bootstrap', async () => {
    await service.bootstrap();
    const info = service.getUserInfo();
    expect(info).toEqual({ id: 1, name: 'John Doe' });
  });
});
