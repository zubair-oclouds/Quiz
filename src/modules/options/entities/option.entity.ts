import { Question } from "src/modules/question/entities/question.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Option {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Question, question => question.id)
    @Column()
    questionId: number;

    @Column({
        default: false
    })
    isAnswer: boolean;

    constructor(option?: Partial<Option>) {
        if (option)
            Object.assign(this, option)
    }
}
