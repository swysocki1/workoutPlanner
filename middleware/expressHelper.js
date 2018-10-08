"use strict";
exports.__esModule = true;
function respond(res, err, result) {
    if (err) {
        res.status(500).send(err.message);
    }
    else {
        res.send(result);
    }
}
exports.respond = respond;
