var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var fs = require("fs");
app.use( bodyParser.json() ); 

//File name were messages will be stored
const MESSAGES_FILE = __dirname + "/" + "messages.json" 

//REST API end points:

//1. List messages currently in the system (messages file)
app.get('/listMessages', function (req, res) {
   fs.readFile( MESSAGES_FILE, 'utf8', function (err, data) {
      res.status(200).send(data);
   });
})

//2. Add a new message: {"id":anId, "text":"some text"}
app.post('/addMessage', function (req, res) {
   if(!req.body.id || !req.body.text) {
      res.status(400);
      res.end('The message does not have text and/or id and can not be saved');
      return
   }
   fs.readFile( MESSAGES_FILE, 'utf8', function (err, data) {
      data = JSON.parse( data );
      data.messages.push(req.body);
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(data))
      res.end( JSON.stringify(data));
   });
})

//3. Check if a message is a palindrome: {"text":"some text"}
app.post('/isPalindrome', function (req, res) {
   if(!req.body.text) {
      res.status(400);
      res.end('There is no text in message body, cannot verify the message');
      return
   }
   message = JSON.stringify(req.body.text)
   if(message === message.split("").reverse().join("")) {
      res.status(200);
      res.end('Submitted text is a palindrome');
      return
   } else {
      res.status(200);
      res.end('Submitted text is a not palindrome');
      return
   }
})

//4. Retrive a message by id
app.get('/message', function (req, res) {
   if(! req.query.id) {
      res.status(400);
      res.end('There is no id in query parameters, cannot look up for a message');
      return
   }
   fs.readFile( MESSAGES_FILE, 'utf8', function (err, data) {
      let dataArray = JSON.parse(data)
      var messageBody;
      dataArray.messages.forEach(function(item){
         if(item.id == req.query.id){
            messageBody = item;
         }
      })
      if(! messageBody) {
         res.status(404);
         res.end('Message with the given id does not exist');
         return
      }
      res.end( JSON.stringify(messageBody) );
   });
})

//5. Delete a message by id
app.delete('/message', function (req, res) {
   if(! req.query.id) {
      res.status(400);
      res.end('There is no id in query parameters, cannot look up for a message');
      return
   }
   data = fs.readFileSync( MESSAGES_FILE, 'utf8');
   let dataArray = JSON.parse(data);
   var i = 0;
   var found = false;
   dataArray.messages.forEach(function(item){
      if(item.id == req.query.id){
         dataArray.messages.splice(i,1);
         found = true;
      }
      i = i + 1;
   })
   if(! found) {
      res.status(404);
      res.end('Message with the given id does not exist and can not be deleted');
      return
   }
   fs.writeFileSync(MESSAGES_FILE, JSON.stringify(dataArray))
   res.end( JSON.stringify(dataArray) );
})

//6. Update a message by id (needs text field as well)
app.put('/message', function (req, res) {
   if(!req.body.id || !req.body.text) {
      res.status(400);
      res.end('There is no id and/or text in message body, cannot update the message');
      return
   }
   data = fs.readFileSync( MESSAGES_FILE, 'utf8');
   let dataArray = JSON.parse(data)
   var found = false;
   dataArray.messages.forEach(function(item){
      if(item.id == req.body.id){
         item.text = req.body.text;
         found = true;
      }
   })
   if(! found) {
      res.status(404);
      res.end('Message with the given id does not exist');
      return
   }
   fs.writeFileSync(MESSAGES_FILE, JSON.stringify(dataArray))
   res.end( JSON.stringify(dataArray) );
})

// Start server on port 8080
var server = app.listen(8080, function () {
   var port = server.address().port
   console.log("Messenger listening at port: %s", port)
})
