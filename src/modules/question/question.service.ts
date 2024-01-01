import { Injectable } from '@nestjs/common';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionDto } from './dto/question.dto';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OptionsService } from '../options/options.service';
import { Option } from '../options/entities/option.entity';

@Injectable()
export class QuestionService {

  constructor(@InjectRepository(Question) private readonly questionRepository: Repository<Question>, private readonly optionService: OptionsService) { }

  async create(createQuestionDto: QuestionDto[], quizId: number) {
    await Promise.all(createQuestionDto.map(async (item: QuestionDto) => {
      item['quizId'] = quizId;
      const addedQuestion = await this.questionRepository.save(item)
      await this.optionService.create(item.options, addedQuestion.id)
    }))
    return this.findByQuizId(quizId);
  }

  async findByQuizId(id: number): Promise<Question[]> {
    const questions: Question[] = await this.questionRepository.find({
      where: {
        quizId: id
      }
    })
    await Promise.all(questions.map(async (ques: Question) => {
      const options: Option[] = await this.optionService.findByQuestionId(ques.id)
      ques['options'] = options
    }))

    return questions;
  }

  findAll() {
    return `This action returns all question`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
