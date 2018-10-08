exports.respond = function respond(res, err, result) {
  if (err) {
    res.status(500).send(err.message);
  }
  else {
    res.send(result);
  }
};
