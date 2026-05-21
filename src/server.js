'use strict';

const config = require('./config');
const app = require('./app');

const server = app.listen(config.port, () => {
  console.log(`\n  Server running on port ${config.port}`);
  console.log(`  Environment: ${config.nodeEnv}`);
  console.log(`  Health check: http://localhost:${config.port}/health`);
  console.log(`  API base: http://localhost:${config.port}/api/v1\n`);
});

const shutdown = (signal) => {
  console.log(`\n  ⏹  ${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('  Server closed.\n');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

module.exports = server;
