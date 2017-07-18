'use strict';

const constants = require('../lib/constants');
const logger = require('../lib/logger');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);


server.on('listening', function () {
    logger.info(`MAYA-Time is listening on port ${server.address().port} in ${service.get('env')} mode...`)
}).listen(3010);

