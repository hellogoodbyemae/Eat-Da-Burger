var express = require('express');
var burger = require('../models/burger.js');

var router = express.Router();

router.get('/', function (req, res) 
{
  burger.selectAll(function(data) 
  {
    var hbsObject = { burgers: data };
    res.render("index", hbsObject);
  });
});

router.post('/api/burger', function (req, res) 
{
  burger.insertOne(req.body.burger_name, req.body.devoured, function(result) 
  {
    res.json({ id: result.insertId});
  });
});

router.put('/api/burger/:id', function (req, res) 
{
  burger.updateOne({ devoured: req.body.devoured }, req.params.id, function() 
  {
    if ((result.changedRows === 0)) {
      return res.status(404).end();
    }else{
      res.status(200).end();
    }
  });
});

router.delete('/api/burger/:id', function(req, res) {
  burger.deleteOne(req.params.id, function(result)
  {
    if ((result.changedRows === 0)) {
      return res.status(404).end();
    }else{
      res.status(200).end();
    }
  });
});

module.exports = router;