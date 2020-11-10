var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.status(200).send('<h2> hello, world ~.~ </h2><br/><h3>society</h3>')
});

module.exports = router;
