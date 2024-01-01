import { IsEmail, IsString } from "class-validator";

export class signinTeacherDto {
    @IsEmail()
    email: string

    @IsString()
    password: string
}