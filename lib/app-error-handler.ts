import logger from './logger';
import { Context } from 'koa';

export default (app: any) => {
  app.on('error', (err: any, ctx: Context) => {
    let _logger = logger;
    let payload: any;

    if (ctx && ctx.logger) {
      _logger = ctx.logger;

      payload = {
        req: ctx.request,
        res: ctx.response,
        user: ctx.state.decodedToken,
        err,
      };
    }

    _logger.error(payload);
  });
};
