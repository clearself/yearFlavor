$('body').on('touchmove', function(event) {
	//禁止页面上下滑动
	event.preventDefault();
});

window.onload = function() {
	var imgs = [
		'./nw/image/sense_one.png',
		'./nw/image/sense_two.png',
		'./nw/image/sense_three.png',
		'./nw/image/sense_four.png',
		'./nw/image/sense_five.png',
		'./nw/image/sense_six.png',
		'./nw/image/sense_seven.png',
	]
	var fixed_id;
	var newCity = [];
	for(var i = city.length - 1; i >= 0; i--) {
		newCity.push(city[i].bcg)
	}
	var areaImgs = uniqueArr(newCity);
	var _imgs = uniqueArr(imgs);
	var flag = 0;
	var mySwiper = null;

	function swiperInit() {
		mySwiper = new Swiper('.swiper-container', {
			direction: 'vertical',
			noSwiping: true,
			noSwipingClass: 'stop-swiping',
			allowTouchMove: false,
			autoplay: {
				delay: 5000,
				stopOnLastSlide: true
			},
			preloadImages: false,
			speed: 500,
			effect: 'fade',
			on: {
				init: function() {
					//隐藏动画元素
					swiperAnimateCache(this);
					//在初始化时触发一次slideChangeTransitionEnd事件
					this.emit('slideChangeTransitionEnd');
				},
				slideChangeTransitionEnd: function() {
					console.log('index', this.activeIndex)
					if(this.activeIndex === 5) {
						var html = getFixedSense(fixed_id);
						$("#fixed").append(html);
					}
					if(this.activeIndex === 0) {
						this.allowSlideNext = false; //设置
					}
					this.activeIndex === 3 && showSelect();
					if(this.activeIndex === 2 || this.activeIndex === 3 || this.activeIndex === 5) {
						this.autoplay.stop();
					}

					//每个slide切换结束时运行当前slide动画
					swiperAnimate(this);
				}
			}
		});
	}

	//预加载所有图片
	var imgTotal = _imgs.length;

	function imgOk() {
		flag++;
		$('.prencet').find('span.num').css('width', (flag / (imgTotal) * 200) + 'px')
		$('.prencet').find('span.text').html(parseInt((flag / (imgTotal)) * 100) + '%')
		if(parseInt((flag / (imgTotal)) * 100) == 100) {
			//图片全部下载完成了
			playMusic();
			setTimeout(function() {
				$(".start-page").hide();
				swiperInit();
				//全部加载完成
				$(".swiper-slide").each(function(i) {
					$(this).css({
						'background-image': "url(" + imgs[i] + ')',
					})
				})

				mySwiper.allowSlideNext = true; //设置
			}, 500)
		};
	};

	function loadPageImg(url) {
		var oNewImg = new Image();
		oNewImg.onload = function() {
			imgOk();
		};
		oNewImg.src = url;
	};

	function loadAreaImgs(url) {
		var oNewImg = new Image();
		oNewImg.onload = function() {};
		oNewImg.src = url;
	};

	function loading() {
		_imgs.forEach(function(url, index) {
			loadPageImg(url);
		});
		areaImgs.forEach(function(url, index) {
			loadAreaImgs(url);
		});
	};
	loading();

	function get_deviceInfo() {
		var device = navigator.userAgent;
		if(device.indexOf('Android') > -1 || device.indexOf('Linux') > -1) {
			return 'android';
		} else if(!!device.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
			return 'ios';
		} else {
			return 'pc';
		}
	}

	//音乐控制
	var music = document.getElementById('music');
	var _audio = document.getElementById('music-audio');
	var browser = navigator.userAgent.toLowerCase();

	function playMusic() {
		if(get_deviceInfo() === 'pc') {
			_audio.play();
		} else if(get_deviceInfo() === 'android' && !browser.match(/micromessenger/i)) {
			_audio.play();
		} else if(get_deviceInfo() === 'ios' && !browser.match(/micromessenger/i)) {
			_audio.pause();
			music.classList.add('stopped');
		}
	}

	$('.music').on('touchstart', function(event) {
		if(_audio.paused) {
			$('#music').removeClass('stopped');
			_audio.play();
		} else {
			$('#music').addClass('stopped');
			_audio.pause();
		}
	});

	$("#backHome").on("touchstart", function() {
		mySwiper.slideNext();
		mySwiper.autoplay.start()
	})
	$("#sense_six").on("touchstart", function() {
		mySwiper.slideNext();
		mySwiper.autoplay.start()
	})

	function getSense(data) {
		var str = '',
			textArr = [],
			imageUrl = '';
		var id = data.values;

		for(var i = 0; i < city.length; i++) {
			if(city[i].ids.some(item => item == id)) {
				textArr = city[i].text;
				imageUrl = city[i].bcg;
			}
		}
		for(var i = 0; i < textArr.length; i++) {
			str += '<p class="ani" swiper-animate-effect="fadeIn" swiper-animate-duration="2s"  swiper-animate-delay="' + (i * 2) + '.3s">' + textArr[i] + '</p>'
		}
		return {
			htmlStr: str,
			image_url: imageUrl,
		};
	}

	function getFixedSense(ids) {
		var str = '',
			textArr = [];

		for(var i = 0; i < city.length; i++) {
			if(city[i].ids.some(item => item == ids)) {
				textArr = city[i].fixed_text;
			}
		}
		for(var i = 0; i < textArr.length; i++) {
			if(i == 0) {
				str += '<p class="title">' + textArr[i] + '</p>'
			} else {
				str += '<p class="desc">' + textArr[i] + '</p>'
			}

		}
		return str;
	}
	//地区选择框
	function showSelect() {
		$('.select-area').mPicker({
			level: 1,
			dataJson: dataJson,
			Linkage: false,
			rows: 5,
			idDefault: true,
			header: '<div class="mPicker-header">选择你的家乡</div>',
			confirm: function(json) {
				console.log(json)
				fixed_id = json.values;
				var _data = getSense(json);
				$(".swiper-slide").eq(mySwiper.activeIndex + 1).css({
					'background-image': "url(" + _data.image_url + ')',
				})
				$("#box").append(_data.htmlStr);
				swiperAnimateCache(mySwiper);
				mySwiper.slideNext();
				mySwiper.autoplay.start()
			}
		}).click()
		var winHeight = $(".mPicker-main.mPicker-bottom").height()
		//$(".mPicker-footer").css("top", ($(window).height() - winHeight) / 2)
		$(".mPicker-footer").css("top", (($(window).height() - winHeight) / 2 - 30) + 'px')
	}
}