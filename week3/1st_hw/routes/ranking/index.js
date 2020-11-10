var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.status(200).send('<h2> hello, world ~.~ </h2><br/><h3>ranking</h3>')
});
router.get('/popular', function(req, res, next) {
    res.status(200).send('<h2> hello, world ~.~ </h2><br/><h3>popular</h3>')
});
router.get('/bestreply', function(req, res, next) {
    res.status(200).send('<h2> hello, world ~.~ </h2><br/><h3>bestreply</h3>')
});
router.get('/age', function(req, res, next) {
    res.status(200).send('<h2> hello, world ~.~ </h2><br/><h3>age</h3>')
});

module.exports = router;
