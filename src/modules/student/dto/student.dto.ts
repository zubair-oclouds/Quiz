import { Expose } from "@nestjs/class-transformer";
import { IsNumber, IsString, MinLength } from "class-validator";

export class StudentDto {
    @Expose()
    id: number

    @IsString()
    @Expose()
    name: string

    @IsString()
    @Expose()
    rollno: string

    @MinLength(8)
    @IsString()
    password: string
}