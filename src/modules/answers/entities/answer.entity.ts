import { Option } from "src/modules/options/entities/option.entity";
import { Question } from "src/modules/question/entities/question.entity";
import { Record } from "src/modules/records/entities/record.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Record, record => record.id)
    @Column()
    recordId: number;

    @ManyToOne(() => Question, question => question.id)
    @Column()
    questionId: number;

    @ManyToOne(() => Option, option => option.id)
    @Column()
    optionId: number;

    constructor(answer?: Partial<Answer>) {
        if (answer)
            Object.assign(this, answer)
    }
}
