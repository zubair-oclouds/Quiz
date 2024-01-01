import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizCreator } from '../quiz-creators/entities/quiz-creator.entity';
import { Question } from '../question/entities/question.entity';
import { Option } from '../options/entities/option.entity';
import { TeacherService } from '../teacher/teacher.service';
import { Teacher } from '../teacher/entities/teacher.entity';
import { Subject } from '../subject/entities/subject.entity';
import { QuestionService } from '../question/question.service';
import { OptionsService } from '../options/options.service';
import { QuizCreatorsService } from '../quiz-creators/quiz-creators.service';
import { SubjectService } from '../subject/subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, QuizCreator, Question, Option, Teacher, Subject])],
  controllers: [QuizController],
  providers: [QuizService, TeacherService, QuestionService, OptionsService, QuizCreatorsService, SubjectService],
})
export class QuizModule { }
