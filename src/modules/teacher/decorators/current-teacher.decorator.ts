import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentTeacher = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        return request.CurrentTeacher
    }
) 