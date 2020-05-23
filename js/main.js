// require js config
require.config({
    baseUrl:"js",

    paths:{
    	"vue":"lib/vue.min",
    	"jquery":"lib/jquery-3.4.0.min",
      "velocity":"https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min",
    }
});

require(["index"]);
