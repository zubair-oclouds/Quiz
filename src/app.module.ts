import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectModule } from './modules/subject/subject.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './modules/student/student.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { RecordsModule } from './modules/records/records.module';
import { QuizCreatorsModule } from './modules/quiz-creators/quiz-creators.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { QuestionModule } from './modules/question/question.module';
import { OptionsModule } from './modules/options/options.module';
import { AnswersModule } from './modules/answers/answers.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.STACKHERO_POSTGRESQL_HOST,
    port: parseInt(<string>process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.STACKHERO_POSTGRESQL_ADMIN_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    autoLoadEntities: true,
    // logging: 'all',
    synchronize: true,
    poolSize: 10,
  }), SubjectModule, StudentModule, QuizModule, RecordsModule, QuizCreatorsModule, TeacherModule, QuestionModule, OptionsModule, AnswersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
