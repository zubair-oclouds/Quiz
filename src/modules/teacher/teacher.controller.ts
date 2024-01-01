import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Session } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherDto } from './dto/teacher.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentTeacher } from './decorators/current-teacher.decorator';
import { Teacher } from './entities/teacher.entity';
import { signinTeacherDto } from './dto/signin-teacher.dto';

@Controller('teacher')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Serialize(TeacherDto)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService, private readonly authService: AuthService) { }

  @Get('whoami')
  whoAmI(@CurrentTeacher() teacher: TeacherDto, @Session() session: any) {
    return teacher
  }

  @Post('signup')
  async create(@Body() createteacherDto: TeacherDto, @Session() session: any) {
    const teacher: Teacher = await this.authService.signup(createteacherDto);
    if (!session) {
      session = {};
    }
    session.email = teacher.email
    return teacher
  }

  @Post('signin')
  async signIn(@Body() teacherDto: signinTeacherDto, @Session() session: any) {
    const teacher = await this.authService.signin(teacherDto);
    if (!session) {
      session = {};
    }
    session.email = teacher.email
    return teacher
  }

  @Post('signout')
  signout(@Session() session: any) {
    session.email = null
    return
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: TeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
