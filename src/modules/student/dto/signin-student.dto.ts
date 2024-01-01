import { IsString } from "class-validator";

export class signinStudentDto {

    @IsString()
    rollno: string

    @IsString()
    password: string
}