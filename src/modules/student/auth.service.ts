import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { StudentService } from "./student.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { StudentDto } from "./dto/student.dto";
import { signinStudentDto } from "./dto/signin-student.dto";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private customerService: StudentService) { }

    async signup(studentDto: StudentDto) {
        const customer = await this.customerService.findByRollNo(studentDto.rollno)
        if (customer) {
            throw new BadRequestException('Roll number already in use.')
        }

        const salt = randomBytes(8).toString('hex')

        const hash = (await scrypt(studentDto.password, salt, 32)) as Buffer

        studentDto.password = salt + '.' + hash.toString('hex')

        const newCustomer = await this.customerService.create(studentDto);

        return newCustomer
    }

    async signin(studentDto: signinStudentDto) {
        const user = await this.customerService.findByRollNo(studentDto.rollno)

        if (!user) {
            throw new NotFoundException('Student not found.')
        }

        const [salt, storedHash] = user.password.split('.')

        const hash = (await scrypt(studentDto.password, salt, 32)) as Buffer

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Incorrect roll no or password.')
        }
        return user
    }
}