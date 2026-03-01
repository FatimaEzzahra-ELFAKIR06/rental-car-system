// const logger = (req, res, next) => {
//   const start = Date.now();

//   res.on('finish', () => {
//     const duration = Date.now() - start;
//     console.log(
//       `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms) | Service: rental-service`
//     );
//   });

//   next();
// };

// module.exports = logger;

const logger = (req, res, next) => {
  const start = Date.now();
  const correlationId = req.headers['x-correlation-id'] || "N/A";

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ` +
      `CID: ${correlationId} | ` +
      `${req.method} ${req.originalUrl} → ${res.statusCode} ` +
      `(${duration}ms) | Service: ${process.env.SERVICE_NAME || "unknown"}`
    );
  });

  next();
};

module.exports = logger;