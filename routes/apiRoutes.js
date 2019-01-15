var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/dogs", function(req, res) {
    db.Dog.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  // Create a new example
  app.post("/api/dogs", function(req, res) {
    db.Dog.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  // Delete an example by id
  // prettier-ignore
  app.delete("/api/dogs/:id", function(req, res) {
    db.Dog.destroy({ where: { id: req.params.id } }).then(function(result) {
      res.json(result);
    });
  });
};
