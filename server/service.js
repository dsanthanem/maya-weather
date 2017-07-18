'use strict';

const constants = require('../lib/constants');
const express = require('express');
const service = express();
const request = require('superagent');
const logger = require('../lib/logger');
const moment = require('moment');

service.get('/time/:location', (req, res, next) => {

    request.get('https://maps.googleapis.com/maps/api/geocode/json' +
        '?address=' + req.params.location +
        '&key=' + constants.GOOGLE_GEOCODING_API_KEY, (err, response) => {

        if (err) {
            logger.info(err);
            return res.sendStatus(500);
        }

        const location = response.body.results[0].geometry.location;
        const lat = location.lat;
        const lng = location.lng;
        const timestamp = +moment().format('X');

        request.get('https://maps.googleapis.com/maps/api/timezone/json' +
            '?location=' + lat + ', '+ lng +
            '&timestamp=' + timestamp +
            '&key=' + constants.GOOGLE_TIMEZONE_API_KEY, (err, response) => {

            if (err) {
                logger.info(err);
                return res.sendStatus(500);
            }
            const results = response.body;
            const locationTime = timestamp + results.dstOffset + results.rawOffset;
            const timeFormatFull = 'dddd, MMMM Do YYYY h:mm:ss A';
            const timeFormatOnlyTime = 'h:mm:ss A';
            const timeStringFull = moment.unix(locationTime).utc().format(timeFormatFull);
            const timeStringOnlyTime = moment.unix(locationTime).utc().format(timeFormatOnlyTime);
            res.json({result: {time: timeStringOnlyTime, dateTime: timeStringFull}});

        });

    });

});

module.exports = service;





