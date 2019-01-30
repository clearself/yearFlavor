var data = OpenInstall.parseUrlParams(); //openinstall.js中提供的工具函数，解析url中的所有查询参数

new OpenInstall({
	/*appKey必选参数，openinstall平台为每个应用分配的ID*/
	appKey: "h1njes",
	/*可选参数，自定义android平台的apk下载文件名，只有apk在openinstall托管时才有效；个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
	//apkFileName : 'com.fm.openinstalldemo-v2.2.0.apk',
	/*可选参数，是否优先考虑拉起app，以牺牲下载体验为代价*/
	preferWakeup:true,
	/*自定义遮罩的html*/
	//mask:function(){
	//  return "<div id='openinstall_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
	//},
	/*openinstall初始化完成的回调函数，可选*/
	onready: function () {
		var m = this;
		/*在app已安装的情况尝试拉起app*/
		// m.schemeWakeup();
		/*用户点击某个按钮时(假定按钮id为downloadButton)，安装app*/
		$('.footer_openApp').on('click', function (e) {
			e.stopPropagation();
			e.preventDefault();
			var browser = navigator.userAgent.toLowerCase();
			if(browser.match(/micromessenger/i) && navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
				window.location.href = 'https://m.xi5jie.com/download/share/guide?page=videoPlayer&numId=' + articleId1;
			} else {
				m.wakeupOrInstall();
			}
		});
	}
}, data);