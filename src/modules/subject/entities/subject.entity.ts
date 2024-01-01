import { Quiz } from "src/modules/quiz/entities/quiz.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    name: string

    @Column({
        default: 0
    })
    count: number

    @BeforeInsert()
    @BeforeUpdate()
    checkCountNonNegative() {
        if (this.count < 0) {
            throw new Error('Count cannot be negative');
        }
    }

    constructor(patient: Partial<Subject>) {
        Object.assign(this, patient);
    }
}
