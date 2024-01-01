import { BadRequestException, Injectable } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {

  constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>) { }

  async create(createStudentDto: StudentDto) {

    const student: Student = await this.studentRepository.findOne({
      where: {
        rollno: createStudentDto.rollno
      }
    })

    if (student) {
      throw new BadRequestException('Roll already exists.')
    }

    const newStudent: Student = new Student({ ...createStudentDto })
    return this.studentRepository.save(newStudent);
  }

  findAll() {
    return this.studentRepository.find();
  }

  findOne(id: number) {
    return this.studentRepository.findOne({
      where: {
        id
      }
    });
  }

  findByRollNo(rollno: string) {
    return this.studentRepository.findOne({
      where: {
        rollno
      }
    });
  }

  update(id: number, updateStudentDto: StudentDto) {
    const student: Student = new Student({ ...updateStudentDto })
    student.id = id
    return this.studentRepository.save(student);
  }

  remove(id: number) {
    return this.studentRepository.delete(id);
  }
}
