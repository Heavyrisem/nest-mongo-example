import { ObjectId } from 'mongodb';
import { CreateDateColumn, ObjectIdColumn } from 'typeorm';

export class CoreEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @CreateDateColumn()
  createdAt: Date;
}
