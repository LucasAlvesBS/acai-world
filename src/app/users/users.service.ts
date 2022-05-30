import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { MessageHelper } from '../../helpers/message.helper';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async findAllUsers() {
    return await createQueryBuilder(UsersEntity, 'users')
      .select(['users.id', 'users.fullName'])
      .getMany();
  }

  async getProfile(conditions: FindConditions<UsersEntity>) {
    try {
      await this.userRepository.findOneOrFail(conditions);
      return await createQueryBuilder(UsersEntity, 'users')
        .select(['users.id', 'users.fullName'])
        .getOne();
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async createUser(data: CreateUserDto) {
    const { email } = data;
    await this.userRepository.findOne({ email });
    const user = this.userRepository.create(data);
    user.password = hashSync(user.password, 10);
    const savedUser = await this.userRepository.save(user);
    savedUser.password = undefined;
    return savedUser;
  }

  async updateUser(
    conditions: FindConditions<UsersEntity>,
    data: UpdateUserDto,
  ) {
    const user = await createQueryBuilder(UsersEntity, 'users')
      .select(['users.id', 'users.password'])
      .where(conditions)
      .getOne();
    const { email } = data;
    await this.userRepository.findOne({ email });
    const oldPassword = user.password;
    this.userRepository.merge(user, data);
    if (oldPassword !== user.password) {
      user.password = hashSync(user.password, 10);
    }
    await this.userRepository.save(user);
  }

  async deleteUser(conditions: FindConditions<UsersEntity>) {
    try {
      await this.userRepository.findOneOrFail(conditions);
      this.userRepository.delete(conditions);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
