define(['vue', 'common', "jquery", "coordinator", "velocity"], function(Vue, common, $, coordinator, Velocity) {
	common.test();
	var v = new Vue({
		el: "#main",
		data: {
			data: [1,2,3,4,5],
			show: false
		},
		methods: {
			async start(e) {
				try {
					const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
					this.handleSuccess(stream);
					this.playing = true;
				} catch (e) {
					this.handleError(e);
				}
			},
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
	console.log("gugugi")
});
