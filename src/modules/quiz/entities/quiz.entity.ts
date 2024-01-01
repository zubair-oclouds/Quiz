import { Subject } from "src/modules/subject/entities/subject.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @ManyToOne(() => Subject, subject => subject.id)
  @Column()
  subjectId: number;

  constructor(quiz?: Partial<Quiz>) {
    if (quiz) {
      Object.assign(this, quiz);
    }
  }
}

