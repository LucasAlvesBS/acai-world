import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MessageHelper } from '../../../helpers/message.helper';
import { RegExHelper } from '../../../helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(RegExHelper.cpf, { message: MessageHelper.CPF_VALID })
  cpf: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(RegExHelper.password, { message: MessageHelper.PASSWORD_VALID })
  password: string;
}
