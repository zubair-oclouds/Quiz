import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { StudentService } from "../student.service";

@Injectable()
export class CurrentStudentInterceptor implements NestInterceptor {
    constructor(private studentService: StudentService) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest()
        const { rollno } = request.session || {}

        if (rollno) {
            const student = await this.studentService.findByRollNo(rollno);
            request.CurrentStudent = student
        }
        return next.handle()
    }
}