import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startAt: string;

  @Column()
  userId: string;

  @Column()
  finished: boolean;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
