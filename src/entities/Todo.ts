/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatusEnum } from '../spec-class/todo';
import TraceTraker from './trace_traker';

@Entity('todo')
export default class TodoEntity extends TraceTraker {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column({ type: 'enum', enum: TodoStatusEnum })
    status: TodoStatusEnum;
    constructor(
        name: string,
        description: string,
        status: TodoStatusEnum | null,
    ) {
        super();
        this.name = name;
        this.description = description;
        this.status = status || TodoStatusEnum.waiting;
    }
}
