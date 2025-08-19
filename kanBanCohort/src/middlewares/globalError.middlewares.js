const globalErrorHandle = async (err, req, res, next) => {
  const message = err.message || "Internal server error";
  const statusCode = err.statusCode || 522;

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    errors: err.errors || [],
  });
};

export default globalErrorHandle;
