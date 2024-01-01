import { Quiz } from "src/modules/quiz/entities/quiz.entity";
import { Teacher } from "src/modules/teacher/entities/teacher.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuizCreator {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Quiz, quiz => quiz.id)
    @Column()
    quizId: number;

    @ManyToOne(() => Teacher, teacher => teacher.id)
    @Column()
    teacherId: number;

    constructor(quizCreator?: Partial<QuizCreator>) {
        if (quizCreator)
            Object.assign(this, quizCreator)
    }
}
