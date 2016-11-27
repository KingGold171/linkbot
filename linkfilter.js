"use strict";
const request = require('request');
const maxIter = 10;

let getRedir = function(url, callback, cur = [], iter = 0) {
    if(url.startsWith('https://lewiste.ch') || url.startsWith('http://lewiste.ch'))
        return;
    iter++;
    request({ url: url, followRedirect: false }, (err, res, body) => {
        if(!res.headers.location || iter >= maxIter)
            return callback(cur);
        cur.push(res.headers.location);
        getRedir(res.headers.location, callback, cur, iter);
    });
}

module.exports = getRedir;