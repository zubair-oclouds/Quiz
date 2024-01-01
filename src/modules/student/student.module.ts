import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Student } from './entities/student.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentStudentInterceptor } from './interceptors/current-student.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService, AuthService, {
    provide: APP_INTERCEPTOR,
    useClass: CurrentStudentInterceptor
  }],
})
export class StudentModule { }
