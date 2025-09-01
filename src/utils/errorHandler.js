function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

function notFound(req, res, next) {
  const err = new Error(`Not Found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
}

function errorHandler(err, req, res, _next) {
  const status = err.status || 500;
  console.error('❌ Error:', err.message);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }
  res.status(status).json({ error: err.message || 'Internal Server Error' });
}

module.exports = { asyncHandler, notFound, errorHandler };
