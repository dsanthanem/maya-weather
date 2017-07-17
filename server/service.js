'use strict';

const constants = require('../lib/constants');
const express = require('express');
const service = express(); // Instantiate the 'express' application object into 'service';
const request = require('superagent');

service.get('/time/:location', (req, res, next) => {

    request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.location + '&key=' + constants.GOOGLE_GEOCODING_API_KEY, (err, response) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        res.json(response.body.results[0].geometry.location);
    });

});

module.exports = service;





