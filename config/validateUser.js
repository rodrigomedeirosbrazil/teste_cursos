module.exports = 
  function(req, res, next) {
    jwt.verify(
      req.headers["x-access-token"],
      req.app.get("secretKey"),
      function(err, decoded) {
        if (err) {
          res
            .status(400)
            .send({ status: "error", message: err.message, data: null });
        } else {
          // add user id to request
          req.body.userId = decoded.id;
          next();
        }
      }
    );
  };

