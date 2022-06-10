import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { MessageHelper } from '../../helpers/message.helper';
import {
  createQueryBuilder,
  FindConditions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';
import { checkDuplicate, checkIfExists } from '../../helpers/function.helper';

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

  async getProfile(req: string) {
    try {
      await this.userRepository.findOneOrFail(req);
      return await createQueryBuilder(UsersEntity, 'users')
        .select(['users.id', 'users.fullName'])
        .where(req)
        .getOne();
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async checkUser(
    conditions: FindConditions<UsersEntity>,
    options?: FindOneOptions<UsersEntity>,
  ) {
    try {
      return await this.userRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new UnauthorizedException(MessageHelper.UNIDENTIFIED_USER);
    }
  }

  async createUser(data: CreateUserDto) {
    const { email } = data;
    const verifyUser = await this.userRepository.findOne({ email });
    checkDuplicate(verifyUser);
    const user = this.userRepository.create(data);
    user.password = hashSync(user.password, 10);
    const savedUser = await this.userRepository.save(user);
    savedUser.password = undefined;
    return savedUser;
  }

  async createAdmin(data: CreateUserDto) {
    const { email } = data;
    const verifyAdmin = await this.userRepository.findOne({ email });
    checkDuplicate(verifyAdmin);
    const admin = this.userRepository.create(data);
    admin.password = hashSync(admin.password, 10);
    admin.isAdmin = true;
    const savedAdmin = await this.userRepository.save(admin);
    savedAdmin.password = undefined;
    return savedAdmin;
  }

  async updateUser(req: string, data: UpdateUserDto) {
    const user = await createQueryBuilder(UsersEntity, 'users')
      .select(['users.id', 'users.password'])
      .where(req)
      .getOne();
    checkIfExists(user);
    const { email } = data;
    const verifyUser = await this.userRepository.findOne({ email });
    checkDuplicate(verifyUser);
    const oldPassword = user.password;
    this.userRepository.merge(user, data);
    if (oldPassword !== user.password) {
      user.password = hashSync(user.password, 10);
    }
    await this.userRepository.save(user);
  }

  async deleteUser(req: string) {
    try {
      await this.userRepository.findOneOrFail(req);
      this.userRepository.delete(req);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
