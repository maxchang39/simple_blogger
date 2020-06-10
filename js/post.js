var v = new Vue({
	el: "#main",
	data: {
		data: [],
		show: false,
		postId: "",
		showRichText: false,
		fadeInDuration: 400,
		isEditing: false,
		content: "",
		title: "",
		postEditTitle: ""
	},
	methods: {
		onClickEditPost: function() {
			instance.val(this.content);
			this.postEditTitle = this.title;
			this.isEditing = true;
		},
		onClickSubmitEditPost: function () {
			console.log(this.postEditTitle);
			console.log(instance.getBody());
			connector.editPost(
				this.postId,
				this.postEditTitle,
				instance.getBody(),
				(data) => {
					window.location.reload(true);
				},
				(err) => {
					alert("Bad request" + err);
				}
			)
		}
	},
	mounted: function(){
		let url = new URL(window.location.href);
		let paths = url.pathname.split("/");
		if (paths.length < 3 || paths[1] != "post")
		window.location.href("/");
		this.postId=paths[2]
		connector.getPostById(
			this.postId,
			(data) => {
				this.content = data.content
				this.title = data.title
				this.show = true
			},
			function(err) {
				window.location.href("/");
			});
		},
	});

	var textarea = document.getElementById('post-edit-textarea');
	sceditor.create(textarea, {
		format: 'xhtml',
		style: '/minified/themes/content/default.min.css',
		toolbar: 'bold,italic,underline|source',
		emoticonsEnabled : false
	});
	var instance = sceditor.instance(textarea);
