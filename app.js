const express = require('express')
const app = express()
const port = 80

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/components', express.static(__dirname + '/components'));
app.use('/favicon', express.static(__dirname + '/favicon'));
app.use('/minified', express.static(__dirname + '/minified'));


app.get('/favicon', function(request, response){
  response.sendFile(__dirname + '/favicon/favicon.ico');
});

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

app.get('/post/*', function(request, response){
  response.sendFile(__dirname + '/html/post.html');
});

app.listen(
  port, () => console.log(`Blog starts on port ${port}!`
  )
)
