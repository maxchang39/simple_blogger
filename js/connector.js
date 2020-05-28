// Define a new component called button-counter
connector = {
  localPosts: [
    {id:1,title:"Why I open my Blog",category:"Daily"},
    {id:2,title:"云中仙境",category:"Story"},
    {id:3,title:"Universal Intelligence",category:"AI"},
  ],
  getPosts : function (category, callback) {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
      console.log("testing on local server")
      callback(this.localPosts.filter(function (e) {
        return category == "All" || e.category == category;
      }));
    }
  }
}
