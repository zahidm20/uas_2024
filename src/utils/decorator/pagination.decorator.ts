import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('req',request.query)

    if(request.query.page === undefined){
        request.query.page = 1;
    }
    if(request.query.pageSize === undefined){
        request.query.pageSize = 10;
    }
    {request.query.limit =
        (Number(request.query.page)-1) * Number (request.query.pageSize),
        (request.query.pageSize =Number(request.query.pageSize));
        request.query.page = Number(request.query.page);
        console.log('req',request.query);
        return request.query
    }

    return request.query;
  },
);