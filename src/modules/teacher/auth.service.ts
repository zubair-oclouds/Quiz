import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { TeacherService } from "./teacher.service";
import { TeacherDto } from "./dto/teacher.dto";
import { signinTeacherDto } from "./dto/signin-teacher.dto";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private teacherService: TeacherService) { }

    async signup(teacherDto: TeacherDto) {
        const teacher = await this.teacherService.findByEmail(teacherDto.email)
        if (teacher) {
            throw new BadRequestException('Email already in use.')
        }

        const salt = randomBytes(8).toString('hex')

        const hash = (await scrypt(teacherDto.password, salt, 32)) as Buffer

        teacherDto.password = salt + '.' + hash.toString('hex')

        const newteacher = await this.teacherService.create(teacherDto);

        return newteacher
    }

    async signin(teacherDto: signinTeacherDto) {
        const teacher = await this.teacherService.findByEmail(teacherDto.email)

        if (!teacher) {
            throw new NotFoundException('Teacher not found.')
        }

        const [salt, storedHash] = teacher.password.split('.')

        const hash = (await scrypt(teacherDto.password, salt, 32)) as Buffer

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Incorrect email or password.')
        }
        return teacher
    }
}