import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { UsersEntity } from 'src/app/users/users.entity';
import { UsersService } from 'src/app/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { sub: user.id, isAdmin: user.isAdmin };
    const token = this.jwtService.sign(payload);
    user.password = undefined;
    user.deletedAt = undefined;
    return {
      token: token,
      user,
    };
  }

  async validateUser(email: string, password: string) {
    let user: UsersEntity;
    try {
      user = await this.userService.checkUser({ email });
    } catch (error) {
      hashSync(password, 10);
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
