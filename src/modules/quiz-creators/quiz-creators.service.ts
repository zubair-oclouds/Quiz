import { Injectable } from '@nestjs/common';
import { CreateQuizCreatorDto } from './dto/create-quiz-creator.dto';
import { UpdateQuizCreatorDto } from './dto/update-quiz-creator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizCreator } from './entities/quiz-creator.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { TeacherService } from '../teacher/teacher.service';

@Injectable()
export class QuizCreatorsService {

  constructor(@InjectRepository(QuizCreator) private readonly quizCreatorRepository: Repository<QuizCreator>, private readonly teacherService: TeacherService) { }

  async create(createQuizCreatorDto: CreateQuizCreatorDto) {
    return this.quizCreatorRepository.save({ ...createQuizCreatorDto });
  }

  async findTeachersByQuizId(id: number): Promise<Teacher[]> {
    const quizCreators: QuizCreator[] = await this.quizCreatorRepository.find({
      where: {
        quizId: id
      }
    })

    const creators: Teacher[] = await Promise.all(quizCreators.map(async (quizCreator: QuizCreator) => {
      const teacher: Teacher = await this.teacherService.findOne(quizCreator.teacherId)
      return teacher
    }))

    return creators;
  }

  findAll() {
    return `This action returns all quizCreators`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizCreator`;
  }

  update(id: number, updateQuizCreatorDto: UpdateQuizCreatorDto) {
    return `This action updates a #${id} quizCreator`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizCreator`;
  }
}
