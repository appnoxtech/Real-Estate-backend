var bunyan = require('bunyan'),
    bformat = require('bunyan-format'),
    formatOut = bformat({ outputMode: 'short' });
var RotatingFileStream = require('bunyan-rotating-file-stream')



var bunyanOpts = {
    name: 'SMR-logs',
    src: true,
    streams: [
        {
            level: 'info',
            stream: formatOut       // log TRACE and above to stdout
        },
        {
            level: 'info',
            stream: new RotatingFileStream({
                path: 'src/logs/%d-%b-%y.log',
                period: '1d',          // daily rotation
                rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
                threshold: '2m',      // Rotate log files larger than 10 megabytes
                totalSize: '20m',      // Don't keep more than 20mb of archived log files
                gzip: true,             // Compress the archive log files to save space

            })
        }
    ]

};



export var logger = bunyan.createLogger(bunyanOpts);
