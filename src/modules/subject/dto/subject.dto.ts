import { IsString } from "class-validator";

export class SubjectDto {
    @IsString()
    name: string
}