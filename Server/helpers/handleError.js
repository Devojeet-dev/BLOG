export const handleError = (statusCode, messege) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = messege;
  return error;
};
