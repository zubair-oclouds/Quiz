import { BadRequestException, Injectable } from '@nestjs/common';
import { QuizDto } from './dto/quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { DataSource, Repository } from 'typeorm';
import { Question } from '../question/entities/question.entity';
import { Subject } from '../subject/entities/subject.entity';
import { QuestionService } from '../question/question.service';
import { Teacher } from '../teacher/entities/teacher.entity';
import { OptionsService } from '../options/options.service';
import { QuizCreatorsService } from '../quiz-creators/quiz-creators.service';
import { CreateQuizCreatorDto } from '../quiz-creators/dto/create-quiz-creator.dto';
import { SubjectService } from '../subject/subject.service';

@Injectable()
export class QuizService {

  constructor(@InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>, private dataSource: DataSource, private readonly questionService: QuestionService, private readonly optionService: OptionsService, private readonly quizCreatorService: QuizCreatorsService, private readonly subjectService: SubjectService) { }

  async create(createQuizDto: QuizDto, teacherId: number) {
    let addedQuiz: Quiz;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      addedQuiz = await this.quizRepository.save({ ...createQuizDto })
      await this.quizCreatorService.create({ quizId: addedQuiz.id, teacherId } as CreateQuizCreatorDto)
      await this.questionService.create(createQuizDto.questions, addedQuiz.id)
    }
    catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
    return this.findOne(addedQuiz.id);
  }

  async findAll() {
    const quizes: Quiz[] = await this.quizRepository.find();
    await Promise.all(quizes.map(async (quiz) => {
      const subject: Subject = await this.subjectService.findOne(quiz.subjectId)
      quiz['subject'] = subject.name

      const quizCreator: Teacher[] = await this.quizCreatorService.findTeachersByQuizId(quiz.id)
      quiz['teacher'] = quizCreator.map(creator => creator.name)

      const question: Question[] = await this.questionService.findByQuizId(quiz.id)
      quiz['questions'] = question
    }))
    return quizes
  }

  async findById(id: number) {
    // console.log(await this.quizRepository.createQueryBuilder('quiz')
    //   .innerJoinAndSelect("quiz.subject", "subject") // Corrected to use the relation, not the column
    //   .innerJoinAndSelect("quiz", "question.quizId") // This needs to reflect the correct property name
    //   .where("quiz.subjectId = :subjectId", { subjectId: 1 })
    //   .getMany())
    return this.quizRepository.findOne({
      where: {
        id
      }
    })
  }

  async findOne(id: number) {
    const quiz: Quiz = await this.findById(id)
    if (!quiz)
      throw new BadRequestException("Quiz doesn't exists.")

    const subject: Subject = await this.subjectService.findOne(quiz.subjectId)
    quiz['subject'] = subject.name

    const quizCreator: Teacher[] = await this.quizCreatorService.findTeachersByQuizId(quiz.id)
    quiz['teacher'] = quizCreator.map(creator => creator.name)

    const question: Question[] = await this.questionService.findByQuizId(quiz.id)
    quiz['questions'] = question

    return quiz;
  }

  update(id: number, updateQuizDto: QuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
