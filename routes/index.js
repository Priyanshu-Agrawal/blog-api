const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.use('/blogs', require('./blogs'));
router.use('/comments', require('./comments'));

module.exports = router;
