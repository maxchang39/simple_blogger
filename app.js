const express = require('express')
const app = express()
const port = 3000

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/video', express.static(__dirname + '/video'));

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

app.get('/posts/1', function(request, response){
  response.sendFile(__dirname + '/posts/post1.txt');
});


app.listen(
  port, () => console.log(`OpenDoor starts on port ${port}!`
  )
)
