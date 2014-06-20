var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('rooms', { title: 'Chat Room2' });
});



module.exports = router;
