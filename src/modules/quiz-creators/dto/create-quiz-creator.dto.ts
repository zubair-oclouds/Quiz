import { IsNumber } from "class-validator";

export class CreateQuizCreatorDto {
    @IsNumber()
    teacherId: number;

    @IsNumber()
    quizId: number;
}
