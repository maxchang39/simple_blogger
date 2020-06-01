var v = new Vue({
	el: "#main",
	data: {
		data: [],
		show: false,
		showRichText: false,
		fadeInDuration: 600,
		content: "",
		title: ""
	},
	methods: {
	},
	mounted: function(){
		let url = new URL(window.location.href);
		let paths = url.pathname.split("/")
		if (paths.length < 3 || paths[1] != "post")
		window.location.href("/");
		connector.getPostById(
		paths[2],
		(data) => {
			console.log(data);
			this.content = data.content
			this.title = data.title
			this.show = true
		},
		function(err) {
			alert("Bad request");
		});
	},
});
