const express = require('express');
const http =    require('http');
const path = require('path')

const app = express();

//Middleware function that serves static files
const publicFiles = path.resolve(__dirname, "public")
app.use(express.static(publicFiles))

//this function will only run if no static files are found
app.use(function(request, response){
  response.writeHead(200, { "Content-Type": "text/plain"})
  response.end("Looks like you didnt find a static file")
})

http.createServer(app).listen(3000);