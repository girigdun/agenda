import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task";

@Entity('users')
export class User {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	cpf: string;

	@Column()
	email: string;

	@Column()
	phone: string;

	@Column()
	password: string;

	@Column()
	createdAt: Date;

	@OneToMany(() => Task, task => task.user)
	tasks: Task[];
}
