import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersEntity } from 'src/app/users/users.entity';
import { MessageHelper } from './message.helper';

export const checkDuplicate = (duplicate: UsersEntity) => {
  if (duplicate) {
    throw new ConflictException(MessageHelper.CONFLICT);
  }
};

export const checkIfExists = (entity: any) => {
  if (!entity) {
    throw new NotFoundException(MessageHelper.NOT_FOUND);
  }
};
