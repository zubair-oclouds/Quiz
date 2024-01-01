import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNumber, IsString, ValidateIf, ValidateNested } from "class-validator";
import { QuestionDto } from "src/modules/question/dto/question.dto";

export class QuizDto {
    @IsString()
    name: string;

    @IsNumber()
    subjectId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionDto)
    questions: QuestionDto[];
}