"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var bunyan = require('bunyan'), bformat = require('bunyan-format'), formatOut = bformat({ outputMode: 'short' });
var RotatingFileStream = require('bunyan-rotating-file-stream');
var bunyanOpts = {
    name: 'SMR-logs',
    src: true,
    streams: [
        {
            level: 'info',
            stream: formatOut // log TRACE and above to stdout
        },
        {
            level: 'info',
            stream: new RotatingFileStream({
                path: 'src/logs/%d-%b-%y.log',
                period: '1d',
                rotateExisting: true,
                threshold: '2m',
                totalSize: '20m',
                gzip: true, // Compress the archive log files to save space
            })
        }
    ]
};
exports.logger = bunyan.createLogger(bunyanOpts);
