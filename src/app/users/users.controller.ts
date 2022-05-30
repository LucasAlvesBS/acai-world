import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Get('profile')
  async getProfile(@Req() req: any) {
    return await this.userService.getProfile(req.user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(@Req() req: any, @Body() body: UpdateUserDto) {
    return await this.userService.updateUser(req.user, body);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Req() req: any) {
    await this.userService.deleteUser(req.user);
  }
}
