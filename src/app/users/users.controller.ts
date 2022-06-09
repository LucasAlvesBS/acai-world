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
  UseGuards,
} from '@nestjs/common';
import {
  checkAbilities,
  CreateUserAbility,
  DeleteUserAbility,
  ReadUserAbility,
  UpdateUserAbility,
} from '../../ability/abilities.decorator';
import { AbilitiesGuard } from '../../ability/abilities.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @checkAbilities(new ReadUserAbility())
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @checkAbilities(new ReadUserAbility())
  async getProfile(@Req() req: any) {
    return await this.userService.getProfile(req.user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @Post('admin')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @checkAbilities(new CreateUserAbility())
  @HttpCode(HttpStatus.CREATED)
  async createAdmin(@Body() body: CreateUserDto) {
    return await this.userService.createAdmin(body);
  }

  @Patch()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @checkAbilities(new UpdateUserAbility())
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(@Req() req: any, @Body() body: UpdateUserDto) {
    return await this.userService.updateUser(req.user, body);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @checkAbilities(new DeleteUserAbility())
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Req() req: any) {
    await this.userService.deleteUser(req.user);
  }
}
