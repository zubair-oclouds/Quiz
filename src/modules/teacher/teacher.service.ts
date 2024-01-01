import { BadRequestException, Injectable } from '@nestjs/common';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherDto } from './dto/teacher.dto';

@Injectable()
export class TeacherService {

  constructor(@InjectRepository(Teacher) private readonly teacherRepository: Repository<Teacher>) { }

  async create(createTeacherDto: TeacherDto) {
    const student: Teacher = await this.findByEmail(createTeacherDto.email)

    if (student) {
      throw new BadRequestException('Email already exists.')
    }

    const newTeacher: Teacher = new Teacher({ ...createTeacherDto })
    return this.teacherRepository.save(newTeacher);
  }

  findAll() {
    return this.teacherRepository.find();
  }

  findOne(id: number) {
    return this.teacherRepository.findOne({
      where: {
        id
      }
    });
  }

  update(id: number, updateTeacherDto: TeacherDto) {
    const newTeacher: Teacher = new Teacher({ ...updateTeacherDto })
    newTeacher.id = id
    return this.teacherRepository.save(newTeacher);
  }

  remove(id: number) {
    return this.teacherRepository.delete(id);
  }

  findByEmail(email: string) {
    return this.teacherRepository.findOne({
      where: {
        email: email
      }
    })
  }
}
