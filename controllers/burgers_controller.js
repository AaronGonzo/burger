var express = require("express");

var router = express.Router();

var burger = require("../models/burger");

router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burger: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burger", function(req, res) {
  burger.create(["name", "devour"]),
    [req.body.name, req.body.devour],
    function(result) {
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
    };
});

router.put("/api/burger/:id", function(req, res) {
  var condition = "id: " + req.params.id;
  console.log("Condition", condition);
  burger.update(
    {
      devour: req.body.devour
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

module.exports = router;
