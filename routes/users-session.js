var express = require('express');
var router = express.Router();
const path = require('path')

router.post('/set-name', function(req, res, next) {
  const { name } = req.body
  // console.log(name)
  req.session.name = name
  res.send(`Your session name has been set successfully to ${name}`)
});

router.get('/get-name', function(req, res, next) {
  console.log(req.session)
  res.send(`your session name is ${req.session.name}`)
});

router.get('/login', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'public', 'login.html'))
});

router.get('/admin', function(req, res, next) {
  if (!req.session.isConnected) return res.status(401).send('No access')
  console.log(req.session.id)
  res.send('Welcome to the Admin page')
});

router.post('/connect', function(req, res, next) {
  const { username, password } = req.body
  if (username === 'john' && password === 'doe') {
    req.session.username = username
    req.session.isConnected = true
    res.redirect('admin')
  } else res.redirect('login')
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('login')
  })
})

module.exports = router;
