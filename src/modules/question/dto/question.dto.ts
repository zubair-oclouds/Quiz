import { IsString, IsBoolean, ValidateIf, IsIn, IsArray, ValidateNested } from "class-validator";
import { QuestionType } from "../entities/question.entity";
import { Type } from "class-transformer";
import { OptionDto } from "src/modules/options/dto/option.dto";

export class QuestionDto {
    @IsString()
    description: string;

    @IsIn(Object.values(QuestionType), {
        message: 'Question type must be open, mcq or checkbox.'
    })
    type: QuestionType; // changed from `option` to `hasOptions` for clarity

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OptionDto)
    options: OptionDto[];
}