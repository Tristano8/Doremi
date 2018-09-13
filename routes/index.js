var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let data = [{id: 1, username: "Middle C"
  }, {id: 2, username: "Bflat"}];

res.json(data);
});

module.exports = router;
