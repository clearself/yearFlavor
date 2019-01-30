//微信设置
var shareurl = location.href;
$.ajax({
	url: "/weixin/share/signature/_ajax?shareurl=" + encodeURIComponent(shareurl),
	type: "get",
	async: true,
	dataType: "json",
	success: function (res) {
		if (res.code != 200) {
			return
		}
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: res.data.appId, // 必填，公众号的唯一标识
			timestamp: res.data.timestamp, // 必填，生成签名的时间戳
			nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
			signature: res.data.signature, // 必填，签名，见附录1
			jsApiList: ['onMenuShareQZone', 'onMenuShareWeibo', 'onMenuShareQQ', 'onMenuShareTimeline',
				'onMenuShareAppMessage'
			] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});

		wx.ready(function () {
			var _audio = document.getElementById('music-audio');
			_audio.play();
			var desc = '你的家乡味道';
			var banner = 'https://cdn.xi5jie.com/logo/180.png';
			var title = '跨越山海，勿忘回家';

			//获取“分享到朋友圈”
			wx.onMenuShareTimeline({
				title: title, // 分享标题
				desc: desc,
				link: location.href.split("#")[0], // 分享链接
				imgUrl: banner, // 分享图标
				success: function () {
					console.log(111)
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					console.log(222)
					// 用户取消分享后执行的回调函数
				}
			});
			//获取“分享到朋友”
			wx.onMenuShareAppMessage({
				title: title, // 分享标题
				desc: desc,
				link: location.href.split("#")[0], // 分享链接
				imgUrl: banner, // 分享图标
				success: function () {
					console.log(111)
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					console.log(222)
					// 用户取消分享后执行的回调函数
				}
			});

			wx.onMenuShareQQ({
				title: title, // 分享标题
				desc: desc,
				link: location.href.split("#")[0], // 分享链接
				imgUrl: banner, // 分享图标
				success: function () {
					console.log(111)
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					console.log(222)
					// 用户取消分享后执行的回调函数
				}
			});

			wx.onMenuShareWeibo({
				title: title, // 分享标题
				desc: desc,
				link: location.href.split("#")[0], // 分享链接
				imgUrl: banner, // 分享图标
				success: function () {
					console.log(111)
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					console.log(222)
					// 用户取消分享后执行的回调函数
				}
			});

			wx.onMenuShareQZone({
				title: title, // 分享标题
				desc: desc,
				link: location.href.split("#")[0], // 分享链接
				imgUrl: banner, // 分享图标
				success: function () {
					console.log(111)
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					console.log(222)
					// 用户取消分享后执行的回调函数
				}
			});

		})

	}

})
