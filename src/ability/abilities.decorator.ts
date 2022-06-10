import { SetMetadata } from '@nestjs/common';
import { UsersEntity } from '../app/users/users.entity';
import { Action, Subjects } from './ability.factory';

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';

export const checkAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);

export class ReadUserAbility implements RequiredRule {
  action = Action.Read;
  subject = UsersEntity;
}

export class CreateUserAbility implements RequiredRule {
  action = Action.Create;
  subject = UsersEntity;
}

export class UpdateUserAbility implements RequiredRule {
  action = Action.Update;
  subject = UsersEntity;
}

export class DeleteUserAbility implements RequiredRule {
  action = Action.Delete;
  subject = UsersEntity;
}
