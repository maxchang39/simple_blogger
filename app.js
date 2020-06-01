const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');
const app = express();
const port = 80;
app.use( bodyParser.json() ); // <--- Here
app.use( bodyParser.urlencoded( { extended: true } ) ); //for body parser to parse correctly

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC8RCjT_WWxkLj0IC8SZTAwBBW-Nlv-kTQ",
  authDomain: "tough-anagram-202500.firebaseapp.com",
  databaseURL: "https://tough-anagram-202500.firebaseio.com",
  projectId: "tough-anagram-202500",
  storageBucket: "tough-anagram-202500.appspot.com",
  messagingSenderId: "216832978402",
  appId: "1:216832978402:web:fac3de9ce6dc539e1c1dbb",
  measurementId: "G-2GF17ETF7L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/favicon', express.static(__dirname + '/favicon'));
app.use('/minified', express.static(__dirname + '/minified'));

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

app.get('/favicon', function(request, response){
  response.sendFile(__dirname + '/favicon/favicon.ico');
});

app.get('/post/*', function(request, response){
  response.sendFile(__dirname + '/html/post.html');
});

app.get('/db/post/*', function(request, response){
  db.collection('posts').get().then( ( snapshot ) => {
    let docs = snapshot.docs.map(doc => {
      d = doc.data();
      d.id = doc.id;
      return d
    });
    response.json(docs);
  });
});

app.post('/db/post', function(request, response){
  if(!request.body.content || !request.body.title) {
    response.status(400).json();
  } else {
    var newPostKey = db.collection('posts').doc().set(
      {
        content: request.body.content,
        title: request.body.title,
        category: "All"
      }
    );
    response.status(200).json();
  }
});

app.post('/db/post/delete', function(request, response){
  if(!request.body.id) {
    response.status(400).json();
  } else {
    db.collection('posts').doc(request.body.id).delete()
    .then(() => {
      response.status(200).json();
    })
    .catch(() => {
      response.status(500).json();
    })
  }
});

app.listen(
  port, () => console.log(`Blog starts on port ${port}!`
  )
)
