import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { OptionsService } from '../options/options.service';
import { Option } from '../options/entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Option])],
  controllers: [QuestionController],
  providers: [QuestionService, OptionsService],
})
export class QuestionModule { }
