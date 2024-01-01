import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Session } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';
import { Student } from './entities/student.entity';
import { AuthService } from './auth.service';
import { CurrentStudent } from './decorators/current-student.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { signinStudentDto } from './dto/signin-student.dto';

@Controller('student')
@UsePipes(new ValidationPipe({ whitelist: true }))
@Serialize(StudentDto)
export class StudentController {
  constructor(private readonly studentService: StudentService, private readonly authService: AuthService) { }

  @Get('whoami')
  whoAmI(@CurrentStudent() student: StudentDto, @Session() session: any) {
    return student
  }

  @Post('signup')
  async create(@Body() createStudentDto: StudentDto, @Session() session: any) {
    const student: Student = await this.authService.signup(createStudentDto);
    if (!session) {
      session = {};
    }
    session.rollno = student.rollno
    return student
  }

  @Post('signin')
  async signIn(@Body() studentDto: signinStudentDto, @Session() session: any) {
    const student = await this.authService.signin(studentDto);
    if (!session) {
      session = {};
    }
    session.rollno = student.rollno
    return student
  }

  @Post('signout')
  signout(@Session() session: any) {
    session.rollno = null
    return
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')


  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: StudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
