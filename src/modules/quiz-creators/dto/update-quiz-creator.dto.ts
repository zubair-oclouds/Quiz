import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizCreatorDto } from './create-quiz-creator.dto';

export class UpdateQuizCreatorDto extends PartialType(CreateQuizCreatorDto) {}
