// @flow

import KnownErrorResponse from './known-error-response';

export default class UnauthorizedResponse extends KnownErrorResponse {
  constructor(
    message: string = 'Unauthorized',
    originalError?: Error | null,
    errorCode?: string | null
  ) {
    super(401, originalError, message, errorCode);
  }
}
