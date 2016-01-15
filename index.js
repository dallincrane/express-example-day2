var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var usersCtrl = require('./controllers/users_controller');

var app = express();

app.use(session({
  secret: 5,
  saveUninitialized: true,
  resave: true
}));

app.use(bodyParser.json());
app.use(function(req, res, next) {
  console.log(req.session);
  next();
});

app.post('/cart', function(req, res, next) {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  req.session.cart.push(req.body);
  res.json(req.session.cart);
});

app.get('/users', usersCtrl.index);
app.get('/users/:id', usersCtrl.show);
app.post('/users', usersCtrl.create);
app.put('/users/:id', usersCtrl.update);
app.delete('/users/:id', usersCtrl.destroy);

var port = 3000;
app.listen(port, function() {
  console.log('listening to port ', port);
});
