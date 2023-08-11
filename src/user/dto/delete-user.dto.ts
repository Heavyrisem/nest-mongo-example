import { PickType } from '@nestjs/mapped-types';

import { User } from '../user.entity';

export class DeleteUserDto extends PickType(User, ['_id']) {}
