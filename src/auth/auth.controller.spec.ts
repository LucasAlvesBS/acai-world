import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const loginEntity = {
  token: '1',
  user: {
    id: '1',
    fullName: 'User1',
    email: 'user1@hotmail.com',
  },
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: { login: jest.fn().mockResolvedValue(loginEntity) },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should login sucessfully', async () => {
      // Arrange
      const req = {
        token: '1',
        user: {
          id: '1',
          fullName: 'User1',
          email: 'user1@hotmail.com',
        },
      };

      // Act
      const result = await authController.login(req);

      // Assert
      expect(result).toEqual(loginEntity);
      expect(authService.login).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      const req = {
        token: '1',
      };

      jest.spyOn(authService, 'login').mockRejectedValueOnce(new Error());

      // Assert
      expect(authController.login(req)).rejects.toThrowError();
    });
  });
});
