const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    data,
    message,
    // statusCode,
    status: true
  });
};

const errorResponse = (res = null, message, statusCode = 400) => {
  const response = {
    // statusCode,
    status: false,
    message: message || 'Something went wrong'
  };
  return res ? res.status(statusCode).json(response) : response;
};

const exceptionResponse = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({
    // statusCode,
    status: false,
    message: error.message || 'Something went wrong'
    // stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });
};

export { successResponse, errorResponse, exceptionResponse };
