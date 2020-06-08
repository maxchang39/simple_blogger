const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');
const app = express();
const port = 80;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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

// utils
getCurrentDate = function() {
  let dateObj = new Date(new Date().toLocaleString(undefined, {
    timeZone: 'America/Los_Angeles'
  }));
  return (dateObj.getMonth()+1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear()
}

getCurrentTime = function() {
  let dateObj = new Date(new Date().toLocaleString(undefined, {
    timeZone: 'America/Los_Angeles'
  }));
  return (dateObj.getHours() < 10 ? '0' : '') + dateObj.getHours() + ":" +
   (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
}

console.log(getCurrentDate());

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

app.get('/favicon', function(request, response){
  response.sendFile(__dirname + '/favicon/favicon.ico');
});

app.get('/post/*', function(request, response){
  response.sendFile(__dirname + '/html/post.html');
});

app.get('/db/posts', function(request, response){
  db.collection('posts').get().then( ( snapshot ) => {
    let docs = snapshot.docs.map(doc => {
      d = doc.data();
      d.id = doc.id;
      return d
    });
    response.json(docs);
  });
});

app.get('/db/post', function(request, response){
  if(!request.query.id) {
    response.status(400).json();
  } else {
    db.collection('posts').doc(request.query.id).get()
    .then( ( snapshot ) => {
      let data = snapshot.data();
      data.id = snapshot.id;
      response.json(data);
    })
    .catch((err) => {
      console.log(err)
      response.status(500).json();
    })
  }
});

// Posts
app.post('/db/post', function(request, response){
  if(!request.body.content || !request.body.title) {
    response.status(400).json();
  } else {
    var newPostKey = db.collection('posts').doc().set(
      {
        content: request.body.content,
        title: request.body.title,
        date: getCurrentDate(),
        time: getCurrentTime(),
        category: request.body.category
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
