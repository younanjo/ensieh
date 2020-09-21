import { pick, map } from 'ramda';
import KnownErrorResponse from './known-error-response';

export default class UnprocessableEntityResponse extends KnownErrorResponse {
  error: any;

  constructor(error: any) {
    super(422, null, 'Validation Error');

    this.error = error;
  }

  toResponse() {
    return {
      known: true,
      status: this.status,
      body: {
        message: this.message,
        errors: map(pick(['path', 'message']), this.error.details),
      },
    };
  }
}
