LOCAL_TEST = false
// Define a new component called button-counter
connector = {
  localPosts: [
    {id:1,title:"Why I open my Blog",category:"Daily"},
    {id:2,title:"云中仙境",category:"Story"},
    {id:3,title:"Universal Intelligence",category:"AI"},
  ],

  getPostById : function (id, callbackSuccess, callbackFail) {
    console.log('/db/post/id?='+id);
    if (!LOCAL_TEST){
      console.log("testing on prod server")
      axios
      .get('/db/post/?id='+id, {
      }).then(function (response) {
        callbackSuccess(
          response.data,
        );
      }).catch(function (err) {
        console.log(err)
        callbackFail();
      });
    } else {
      alert("testing on local server");
      callbackSuccess(this.localPosts[0]);
    }
  },

  getPosts : function (category, callback) {
    if (!LOCAL_TEST){
      console.log("testing on prod server")
      axios({
        method: 'get',
        url: '/db/posts',
      }).then(function (response) {
        callback(
          response.data.filter(function (e) {
            return category == "All" || e.category == category;
          })
        );
      })
    } else {
      callback(this.localPosts.filter(function (e) {
        return category == "All" || e.category == category;
      }));
    }
  },

  postNewPost : function (title, content, category, callbackSuccess, callbackFail) {
    console.log(title, content)
    if (!LOCAL_TEST){
      console.log("testing on prod server");
      axios
      .post("/db/post", {
        title: title,
        content: content.outerHTML,
        category: category
      }).then( (response) => {
        console.log(response)
        callbackSuccess();
      }).catch( (err) => {
        callbackFail(err);
      })
    } else {
      alert("testing on local server");
      callbackSuccess();
    }
  },

  editPost: function(id, title, content, callbackSuccess, callbackFail) {
    console.log(id, title, content);
    if (!LOCAL_TEST){
      console.log("testing on prod server");
      axios
      .post("/db/post/edit", {
        id: id,
        title: title,
        content: content.outerHTML
      }).then( (response) => {
        callbackSuccess();
      }).catch( (err) => {
        callbackFail(err);
      })
    } else {
      alert("testing on local server");
      callbackSuccess();
    }
  },

  deletePost : function (id, callbackSuccess, callbackFail) {
    console.log(id)
    if (!LOCAL_TEST){
      console.log("testing on prod server");
      axios
      .post("/db/post/delete", {
        id: id,
      }).then( (response) => {
        console.log(response)
        callbackSuccess();
      }).catch( (err) => {
        callbackFail(err);
      })
    } else {
      alert("testing on local server");
      callbackSuccess();
    }
  }
}
