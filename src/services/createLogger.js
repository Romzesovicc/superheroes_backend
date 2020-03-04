import { createLogger, format, transports } from 'winston';
import {
  grey, green, cyan, blue, magenta, yellow, red,
} from 'colors';

import { loggerLabels } from '../config/constants';

const {
  colorize, combine, timestamp, label, printf, splat,
} = format;

// eslint-disable-next-line no-shadow
const getLabelColor = (label, level) => {
  switch (label) {
    case loggerLabels.APP: return green(`[${label}|${level}]`);
    case loggerLabels.DEBUG: return blue(`[${label}]`);
    case loggerLabels.HTTP: return magenta(`[${label}]`);
    default: return cyan(`[${label}|${level}]`);
  }
};

const loggerFormat = printf((info) => `${grey(info.timestamp)} ${getLabelColor(info.label, info.level)}: ${info.message}`);


const appLogger = createLogger({
  format: combine(
    colorize(),
    splat(),
    label({ label: loggerLabels.APP }),
    timestamp(),
    loggerFormat,
  ),
  stderrLevels: ['error'],
  transports: [new transports.Console()],
});

export default appLogger;
