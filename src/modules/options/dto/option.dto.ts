import { IsBoolean, IsString } from "class-validator";

export class OptionDto {
    @IsString()
    name: string;

    @IsBoolean()
    isAnswer: boolean;
}
