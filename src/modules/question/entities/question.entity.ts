import { Quiz } from "src/modules/quiz/entities/quiz.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum QuestionType {
    Open = "open",
    MCQ = "mcq",
    CHECKBOX = "checkbox",
}

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @ManyToOne(() => Quiz, quiz => quiz.id)
    @Column()
    quizId: number;

    @Column({
        type: 'enum',
        enum: QuestionType,
        default: QuestionType.Open
    })
    type: QuestionType;

    constructor(question?: Partial<Question>) {
        if (question)
            Object.assign(this, question)
    }
}
