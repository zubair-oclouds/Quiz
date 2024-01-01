import { PartialType } from '@nestjs/mapped-types';
import { OptionDto } from './option.dto';
import { IsNumber } from 'class-validator';

export class CreateOptionDto extends PartialType(OptionDto) {
    @IsNumber()
    questionId: number
}
