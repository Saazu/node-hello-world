const express = require('express');
const http =    require('http');
const morgan = require('morgan');
const path = require('path')

const app = express();
app.use(morgan("short"));

app.use(function(request, response, next) {
  console.log(`Request to ${request.url}`);
  console.log(request.headers);
  next();
})

//Middleware function that serves static files
const publicFiles = path.resolve(__dirname, "public")
app.use(express.static(publicFiles))

app.use(function(request, response){

})

//the order in which these middleware functions are defined matters
//if the authenticating middleware function is defined after the 
//the one that handles responses, all users will be authenticated
app.use(function(request, response, next) {
  const minute = (new Date()).getMinutes();
  if ((minute % 2) === 0) {
    next();
  } else {
    response.statusCode = 403;
    response.end("Not authorised");
  }
})

app.use(function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end(`Hello world. Secret info: Nimitz bombed a wedding`);
})

// app.listen(3000) is equivalent to the line below
// app.listen is shorthand [does this qualify as syntactic sugar]
// doesnt leave any cavities in understanding what's going on
http.createServer(app).listen(3000);