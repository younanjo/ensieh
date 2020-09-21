class KnownErrorResponse extends Error {
  originalError: any;
  errorCode: string | null;
  status: number;

  constructor(
    status: number,
    originalError: any,
    message: string,
    errorCode: string | null = null
  ) {
    super(message);

    Error.captureStackTrace(this, KnownErrorResponse);

    if (originalError && originalError.originalError) {
      delete originalError.originalError.request;
    }

    this.errorCode = errorCode;
    this.originalError = originalError;
    this.status = status;
  }

  toResponse() {
    const body = this.errorCode
      ? {
          message: this.message,
          code: this.errorCode,
        }
      : {
          message: this.message,
        };

    return {
      known: true,
      status: this.status,
      body,
    };
  }
}

export default KnownErrorResponse;
