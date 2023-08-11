import { PartialType, PickType } from '@nestjs/mapped-types';

import { User } from '../user.entity';

export class FindUserDto extends PartialType(PickType(User, ['_id', 'name', 'email'])) {}
