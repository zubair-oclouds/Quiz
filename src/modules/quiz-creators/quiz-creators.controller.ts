import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizCreatorsService } from './quiz-creators.service';
import { CreateQuizCreatorDto } from './dto/create-quiz-creator.dto';
import { UpdateQuizCreatorDto } from './dto/update-quiz-creator.dto';

@Controller('quiz-creators')
export class QuizCreatorsController {
  constructor(private readonly quizCreatorsService: QuizCreatorsService) {}

  @Post()
  create(@Body() createQuizCreatorDto: CreateQuizCreatorDto) {
    return this.quizCreatorsService.create(createQuizCreatorDto);
  }

  @Get()
  findAll() {
    return this.quizCreatorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizCreatorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizCreatorDto: UpdateQuizCreatorDto) {
    return this.quizCreatorsService.update(+id, updateQuizCreatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizCreatorsService.remove(+id);
  }
}
