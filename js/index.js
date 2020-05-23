var v = new Vue({
	el: "#main",
	data: {
		data: [1,2,3,4,5],
		message: 'Hello Vue!',
		show: false
	},
	methods: {
		beforeEnter: function (el) {
			el.style.opacity = 0
		},
		enter: function (el, done) {
			var vm = this
			Velocity(el,
				{ opacity: 1 },
				{
					duration: this.fadeInDuration,
					complete: function () {
						done()
						if (!vm.stop) vm.show = false
					}
				}
			)
		},
		leave: function(el, done) {
		}
	}
});
