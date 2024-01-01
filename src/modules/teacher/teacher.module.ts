import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { AuthService } from './auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentTeacherInterceptor } from './interceptors/current-teacher.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [TeacherService, AuthService, {
    provide: APP_INTERCEPTOR,
    useClass: CurrentTeacherInterceptor
  }],
})
export class TeacherModule { }
