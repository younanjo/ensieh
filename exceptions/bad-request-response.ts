import KnownErrorResponse from './known-error-response';

class BadRequestResponse extends KnownErrorResponse {
  constructor(
    message = 'Bad Request',
    originalError = null,
    errorCode = null
  ) {
    super(400, originalError, message, errorCode);
  }
}

export default BadRequestResponse;
