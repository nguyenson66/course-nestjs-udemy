import { IsNotEmpty } from 'class-validator';
import { Task } from 'src/tasks/tasks.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'username',
    type: 'varchar',
    unique: true,
  })
  @IsNotEmpty()
  username: string;

  @Column({
    name: 'password',
    type: 'varchar',
  })
  @IsNotEmpty()
  password: string;

  @Column({
    name: 'birthday',
    type: 'varchar',
    length: 10,
    default: '30/03/2022',
  })
  birthday?: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
