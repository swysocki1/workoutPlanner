exports.respond = function respond(res, err, result) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    if (err) {
        if (err.status) {
            res.status(err.status).send(err.message);
        } else {
            res.status(500).send(err.message);
        }
    } else {
        res.send(result);
    }
};
exports.deepCopy = function deepCopy(obj) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (null === obj || 'object' !== typeof obj) { return obj; }

    // Handle Date
    if (obj instanceof Date) {
        // copy = new Date();
        // copy.setTime(obj.getTime());
        copy = obj;
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) { copy[attr] = deepCopy(obj[attr]); }
        }
        return copy;
    }

    throw new Error('Unable to copy obj! Its type isn\'t supported.');
};