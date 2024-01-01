import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { OptionDto } from './dto/option.dto';

@Injectable()
export class OptionsService {

  constructor(@InjectRepository(Option) private readonly optionRepository: Repository<Option>) { }

  async create(createOptionDto: OptionDto[], questionId: number) {
    await Promise.all(createOptionDto.map(async (row: OptionDto) => {
      row['questionId'] = questionId;
      await this.optionRepository.save({ ...row })
    }))
    return this.findByQuestionId(questionId);
  }

  async findByQuestionId(id: number) {
    return this.optionRepository.find({
      where: {
        questionId: id
      }
    })
  }

  findAll() {
    return `This action returns all options`;
  }

  findOne(id: number) {
    return `This action returns a #${id} option`;
  }

  update(id: number, updateOptionDto: UpdateOptionDto) {
    return `This action updates a #${id} option`;
  }

  remove(id: number) {
    return `This action removes a #${id} option`;
  }
}
