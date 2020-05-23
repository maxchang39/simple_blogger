const express = require('express')
const app = express()
const port = 80

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/video', express.static(__dirname + '/video'));

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
