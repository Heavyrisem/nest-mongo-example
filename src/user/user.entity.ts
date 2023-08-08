import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { CoreEntity } from '~src/modules/database/core.entity';

@Entity()
export class User extends CoreEntity {
  @Column()
  @IsString()
  email: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  password: string;
}
