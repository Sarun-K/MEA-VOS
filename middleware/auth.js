const jwt = require('jsonwebtoken');
const role=require('./role');

module.exports = function (req, res, next) {
  const token = req.header('x-access-token');
  if (!token) return res.status(401).send('Access Denied: No Token Provided!');
  try {
  const decoded = jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'));
  if(role[decoded.role].find(function(url){ return url==req.baseUrl})){req.user=decoded
  next();
  }
  else
  return res.status(401).send('Access Denied: You dont have correct privilege to perform this operation');}
  catch (ex) {
  res.status(401).send('Invalid Token')
  }}

