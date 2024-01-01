import { Module } from '@nestjs/common';
import { QuizCreatorsService } from './quiz-creators.service';
import { QuizCreatorsController } from './quiz-creators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizCreator } from './entities/quiz-creator.entity';
import { TeacherService } from '../teacher/teacher.service';
import { Teacher } from '../teacher/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizCreator, Teacher])],
  controllers: [QuizCreatorsController],
  providers: [QuizCreatorsService, TeacherService],
})
export class QuizCreatorsModule { }
