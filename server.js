var express = require('express');
var nodemailer = require('nodemailer');
var app = express();
var port = process.env.PORT || 8300;

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'pixeltrackerbot@gmail.com',
    pass: process.env.PASS
  }
});


app.listen(port, function(){
  console.log('Server is listening on ' + port);
});
 
 
 
app.get('/*', function (req, res, next) {
  var returnStr = '';
  
  returnStr += 'user-agent: ' + req.headers['user-agent'] + '<br> hostname: ' + req.hostname + 
  '<br> remoteAdress: ' + req.connection.remoteAddress + '<br> domain:' + req.connection.domain;
  
  res.sendFile('./assets/tp.gif', {"root": __dirname});
  
  transporter.sendMail({
    from: 'pixelTracker ✔ <pixelTracker@gmail.com>', 
    to: 'jakobharclerode@gmail.com', 
    subject: 'Mail opened ✔', 
    html: returnStr,
  }, function (err, info) {
      if (err) {
        return err;
      } else {
        return info;
      }
  });
  
});
