import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

const mockRepository = {
  createQueryBuilder: jest.fn().mockReturnValue({
    select: jest.fn().mockReturnValue(usersEntityList),
    getMany: jest.fn().mockReturnThis(),
  }),
  findOne: jest.fn(),
  findOneOrfail: jest.fn(),
  create: jest.fn(),
  merge: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<UsersEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<UsersEntity>>(
      getRepositoryToken(UsersEntity),
    );
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('deleteUser', () => {
    it('should delete a user sucessfully', async () => {
      mockRepository.findOne.mockReturnValue(usersEntityList[0]);
      mockRepository.delete.mockReturnValue(usersEntityList[0]);

      const result = await usersService.deleteUser('1');

      expect(result).toBeUndefined();
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      expect(usersService.deleteUser('1')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
