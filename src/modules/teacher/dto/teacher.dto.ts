import { Expose } from "@nestjs/class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class TeacherDto {
    @Expose()
    id: number

    @IsString()
    @Expose()
    name: string;

    @IsEmail()
    @Expose()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}