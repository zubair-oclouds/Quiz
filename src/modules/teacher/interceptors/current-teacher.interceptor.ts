import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { TeacherService } from "../teacher.service";

@Injectable()
export class CurrentTeacherInterceptor implements NestInterceptor {
    constructor(private teacherService: TeacherService) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest()
        const { email } = request.session || {}

        if (email) {
            const teacher = await this.teacherService.findByEmail(email);
            request.CurrentTeacher = teacher
        }
        return next.handle()
    }
}