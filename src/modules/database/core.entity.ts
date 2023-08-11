import { Transform, TransformationType } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongodb';
import { CreateDateColumn, ObjectId as ObjectIdType, ObjectIdColumn } from 'typeorm';
export class CoreEntity {
  @ObjectIdColumn()
  @Transform(({ value, type }) => {
    console.log('Transform:', value, type);
    if (type === TransformationType.PLAIN_TO_CLASS) {
      return new ObjectId(value);
    }

    return value.toString();
  })
  // @Transform(({ value }) => new ObjectId(value), { toClassOnly: true })
  // @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  _id: ObjectIdType;

  @CreateDateColumn()
  createdAt: Date;
}
