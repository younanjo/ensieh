import { v4 as uuid } from 'uuid';
const HEADER_NAME = 'X-Request-Id';

export default function() {
  return async (ctx: any, next: any) => {
    // If X-Request-Id exists in the header, respect it and set it to ctx.
    // Otherwise generate a new one.
    let requestId: string;
    try {
      requestId = ctx.get(HEADER_NAME) || uuid();

      // Set it to ctx.state so other middleware can access it.
      ctx.state.requestId = requestId;

      // Set it to response header.
      ctx.set(HEADER_NAME, requestId);
    } catch (err) {
      ctx.logger.error(err);
    }

    if (next) {
      await next();
    }
  };
}

export function getRequestIdFromContext(ctx: any) {
  return () => (ctx.state && ctx.state.requestId) || uuid();
}
