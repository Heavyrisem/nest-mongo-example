import { PartialType, PickType } from '@nestjs/mapped-types';

import { User } from '../user.entity';

export class UpdateUserDto extends PartialType(
  PickType(User, ['_id', 'name', 'email', 'password']),
) {}
