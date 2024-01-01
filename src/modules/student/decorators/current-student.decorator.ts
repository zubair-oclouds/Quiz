import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentStudent = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        return request.CurrentStudent
    }
) 