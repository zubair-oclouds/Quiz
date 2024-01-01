import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    rollno: string;

    @Column()
    name: string

    @Column()
    password: string

    constructor(student: Partial<Student>) {
        Object.assign(this, student);
    }
}
