import { Quiz } from "src/modules/quiz/entities/quiz.entity";
import { Student } from "src/modules/student/entities/student.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Record {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, student => student.id)
    @Column()
    studentId: Student

    @ManyToOne(() => Quiz, quiz => quiz.id)
    @Column()
    quizId: Quiz

    @Column({
        default: 0
    })
    obtained: number

    @Column()
    total: number;

    @Column()
    attempted: number

    @BeforeInsert()
    @BeforeUpdate()
    checkCountNonNegative() {
        if (this.obtained < 0) {
            throw new Error('Obtained marks cannot be negative');
        }
    }

    constructor(record: Partial<Record>) {
        Object.assign(this, record);
    }
}
