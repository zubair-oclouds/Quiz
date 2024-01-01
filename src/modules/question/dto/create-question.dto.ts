import { IsNumber } from "class-validator";
import { QuestionDto } from "./question.dto";
import { PartialType } from '@nestjs/mapped-types';

export class CreateQuestionDto extends PartialType(QuestionDto) {
    @IsNumber()
    quizId: number;
}
