var v = new Vue({
	el: "#main",
	data: {
		data: [],
		show: false,
		showRichText: false,
		fadeInDuration: 600,
		currentTab: "",
		tabNames: ["All", "Daily", "AI", "Story"],
		clickBlocked: false,
		isActive: false,
		isSubmitting: false,
		computedHeight: 0,
		newTitle: "",
	},
	methods: {
		beforeEnter: function (el) {
			el.style.opacity = 0;
		},
		enter: function (el, done) {
			var vm = this
			Velocity(el,
				{ opacity: 1 },
				{
					duration: this.fadeInDuration,
					complete: function () {
						done()
					}
				}
			)
		},
		leave: function () {
		},
		onTabClick: function(e) {
			if (this.currentTab != e.srcElement.innerHTML){
				this.show = false
				this.currentTab = e.srcElement.innerHTML;
				connector.getPosts(this.currentTab, (data) => {
					this.data = data
					this.show = true
				});
			}
		},
		onClickNewPost: function(e){
			this.isActive = !this.isActive;
		},
		onClickSubmitNewPost: function(e) {
			console.log(instance.getBody());
			console.log(this.newTitle || "");
			this.isSubmitting = true;
			connector.postNewPost(this.newTitle,instance.getBody(),
			function(data) {
				window.location.href = "/";
			},
			function(err) {
				alert("Bad request");
				v.isSubmitting = false;
			});
		},
		onClickDeletePost: function(id) {
			if (confirm("Please confirm to delete post")) {
				connector.deletePost(id,
				function(data) {
					window.location.href = "/";
				},
				function(err) {
					alert("Bad request");
				});
			}
		},
		initHeight: function(){
			this.$refs['myText'].style.height = 'auto';
			this.$refs['myText'].style.position = 'absolute';
			this.$refs['myText'].style.visibility = 'hidden';
			this.$refs['myText'].style.display = 'block';

			const height = getComputedStyle(this.$refs['myText']).height;
			this.computedHeight= height;

			this.$refs['myText'].style.position = null;
			this.$refs['myText'].style.visibility = null;
			this.$refs['myText'].style.display = null;
			this.$refs['myText'].style.height = 0;
		}
	},
	mounted: function(){
		this.initHeight();
		connector.getPosts("All", (data) => {
			console.log(data);
			this.data = data
			this.show = true
		});
	}
});

var textarea = document.getElementById('post-new-textarea');
sceditor.create(textarea, {
	format: 'xhtml',
	style: 'minified/themes/content/default.min.css',
	toolbar: 'bold,italic,underline|source',
	emoticonsEnabled : false
});
var instance = sceditor.instance(textarea);
