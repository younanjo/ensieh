import pino from 'pino';

// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
const pinoLevelToSeverityLookup: any = {
  trace: 'DEBUG',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
  fatal: 'CRITICAL',
};

const logger = pino({
  name: 'demo.bank',
  prettyPrint: process.env.NODE_ENV !== 'production',
  formatters: {
    level(label, number) {
      return {
        severity:
          pinoLevelToSeverityLookup[label] || pinoLevelToSeverityLookup['info'],
        level: number,
      };
    },
  },
});

export default logger;
