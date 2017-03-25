'use strict';

var _ = require('lodash');
var validator = require('validator');
var countries = require('../resources/countriesV2');

var notFound = function (res) {
    res.json(404, {
        message: 'Sorry, that page does not exist ...',
        code: 42
    });
};

exports.index = function (req, res) {
    res.send({message: 'Welcome to my world!'});
};

exports.getAll = function (req, res) {
    res.status(200).json(countries);
};

exports.callingCode = function (req, res) {
    var callingCode = req.params.callingCode;
    var countryList = _.reduce(countries, function (result, country) {
        if (validator.isIn(callingCode, country.callingCodes)) {
            result.push(country);
        }
        return result;
    }, []);
    if (countryList.length < 1) {
        notFound(res);
    }
    res.status(200).json(countryList);
};

exports.currency = function (req, res) {
    var currencyCode = req.params.currencyCode;
    var countryList = _.reduce(countries, function (result, country) {
        if (validator.isIn(currencyCode.toUpperCase(), _.map(country.currencies, 'code'))) {
            result.push(country);
        }
        return result;
    }, []);
    if (countryList.length < 1) {
        notFound(res);
    }
    res.status(200).json(countryList);
};

exports.region = function (req, res) {
    var regionName = req.params.regionName;
    var countryList = _.reduce(countries, function (result, country) {
        if (country.region.toLowerCase() === regionName.toLowerCase()) {
            result.push(country);
        }
        return result;
    }, []);
    if (countryList.length < 1) {
        notFound(res);
    }
    res.status(200).json(countryList);
};

exports.subregion = function (req, res) {
    var subregionName = req.params.subregionName;
    var countryList = _.reduce(countries, function (result, country) {
        if (country.subregion.toLowerCase() === subregionName.toLowerCase()) {
            result.push(country);
        }
        return result;
    }, []);
    if (countryList.length < 1) {
        notFound(res);
    }
    res.status(200).json(countryList);
};
