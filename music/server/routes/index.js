let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();

mongoose.connect('mongodb://127.0.0.1:27017/music');

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success');
});

mongoose.connection.on('error', () => {
  console.log('MongoDB connect fail');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

console.log('Node server listen port 3000');

router.get('/', (req, res) => {
  res.render('index', {title: 'Express'});
});

module.exports = router;
