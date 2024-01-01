import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizDto } from './dto/quiz.dto';
import { TeacherService } from '../teacher/teacher.service';
import { Teacher } from '../teacher/entities/teacher.entity';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService, private readonly teacherService: TeacherService) { }

  @Post()
  async create(@Body() createQuizDto: QuizDto, @Session() session: any) {
    const teacher: Teacher = await this.teacherService.findByEmail(session.email)
    return this.quizService.create(createQuizDto, teacher.id);
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: QuizDto, @Session() session: any) {
    return this.quizService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(+id);
  }
}
