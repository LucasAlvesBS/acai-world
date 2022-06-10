import { Test, TestingModule } from '@nestjs/testing';
import { AbilityModule } from '../../ability/ability.module';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

const usersEntityList = [
  new UsersEntity({
    id: '1',
    fullName: 'User1',
    email: 'user1@hotmail.com',
  }),
  new UsersEntity({
    id: '2',
    fullName: 'User2',
    email: 'user2@hotmail.com',
  }),
  new UsersEntity({
    id: '3',
    fullName: 'User3',
    email: 'user3@hotmail.com',
  }),
];

const newUserEntity = new UsersEntity({
  fullName: 'New User',
  email: 'newuser@hotmail.com',
  cpf: '12345678901',
  password: 'Newuser@123',
});

const updateUserEntity = new UsersEntity({
  fullName: 'User1',
  email: 'updateduser@hotmail.com',
});

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AbilityModule],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAllUsers: jest.fn().mockResolvedValue(usersEntityList),
            getProfile: jest.fn().mockResolvedValue(usersEntityList[0]),
            createUser: jest.fn().mockResolvedValue(newUserEntity),
            createAdmin: jest.fn().mockResolvedValue(newUserEntity),
            updateUser: jest.fn().mockResolvedValue(updateUserEntity),
            deleteUser: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should return a users list entity sucessfully', async () => {
      // Act
      const result = await usersController.findAllUsers();

      // Assert
      expect(result).toEqual(usersEntityList);
      expect(typeof result).toEqual('object');
      expect(usersService.findAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(usersService, 'findAllUsers')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.findAllUsers()).rejects.toThrowError();
    });
  });

  describe('getProfile', () => {
    it('should get a profile sucessfully', async () => {
      // Act
      const result = await usersController.getProfile('1');

      // Assert
      expect(result).toEqual(usersEntityList[0]);
      expect(usersService.getProfile).toHaveBeenCalledTimes(1);
    });

    it('should thorw an exception', () => {
      // Arrange
      jest.spyOn(usersService, 'getProfile').mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.getProfile('1')).rejects.toThrowError();
    });
  });

  describe('createUser', () => {
    it('should create a new user sucessfully', async () => {
      // Arrange
      const body: CreateUserDto = {
        fullName: 'New User',
        email: 'newuser@hotmail.com',
        cpf: '12345678901',
        password: 'Newuser@123',
      };

      // Act
      const result = await usersController.createUser(body);

      // Assert
      expect(result).toEqual(newUserEntity);
      expect(usersService.createUser).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: CreateUserDto = {
        fullName: 'New User',
        email: 'newuser@hotmail.com',
        cpf: '12345678901',
        password: 'Newuser@123',
      };

      jest.spyOn(usersService, 'createUser').mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.createUser(body)).rejects.toThrowError();
    });
  });

  describe('createAdmin', () => {
    it('should create a new admin user sucessfully', async () => {
      // Arrange
      const body: CreateUserDto = {
        fullName: 'New User',
        email: 'newuser@hotmail.com',
        cpf: '12345678901',
        password: 'Newuser@123',
      };

      // Act
      const result = await usersController.createAdmin(body);

      // Assert
      expect(result).toEqual(newUserEntity);
      expect(usersService.createAdmin).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: CreateUserDto = {
        fullName: 'New User',
        email: 'newuser@hotmail.com',
        cpf: '12345678901',
        password: 'Newuser@123',
      };

      jest
        .spyOn(usersService, 'createAdmin')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.createAdmin(body)).rejects.toThrowError();
    });
  });

  describe('updateUser', () => {
    it('should update a user sucessfully', async () => {
      // Arrange
      const body: UpdateUserDto = {
        fullName: 'User1',
        email: 'updateduser@hotmail.com',
      };

      // Act
      const result = await usersService.updateUser('1', body);

      // Assert
      expect(result).toEqual(updateUserEntity);
      expect(usersService.updateUser).toHaveBeenCalledTimes(1);
      expect(usersService.updateUser).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception', () => {
      //Arrange
      const body: UpdateUserDto = {
        fullName: 'User1',
        email: 'updateduser@hotmail.com',
      };

      jest.spyOn(usersService, 'updateUser').mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.updateUser('1', body)).rejects.toThrowError();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user sucessfully', async () => {
      // Act
      const result = await usersController.deleteUser('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(usersService, 'deleteUser').mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.deleteUser('1')).rejects.toThrowError();
    });
  });
});
