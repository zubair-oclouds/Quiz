import { BadRequestException, Injectable } from '@nestjs/common';
import { Subject } from './entities/subject.entity';
import { SubjectDto } from './dto/subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {

  constructor(@InjectRepository(Subject) private readonly subjectRepository: Repository<Subject>) { }

  async create(createSubjectDto: SubjectDto) {
    const subject: Subject = await this.subjectRepository.findOne({
      where: {
        name: createSubjectDto.name
      }
    })

    if (subject) {
      throw new BadRequestException('Subject already exists.')
    }

    const newSubject: Subject = new Subject({ ...createSubjectDto })
    return this.subjectRepository.save(newSubject);
  }

  findAll() {
    return this.subjectRepository.find();
  }

  findOne(id: number) {
    return this.subjectRepository.findOne({
      where: {
        id
      }
    });
  }

  update(id: number, updateSubjectDto: SubjectDto) {
    const subject: Subject = new Subject({ ...updateSubjectDto })
    subject.id = id
    return this.subjectRepository.save(subject);
  }

  remove(id: number) {
    return this.subjectRepository.delete(id);
  }
}
