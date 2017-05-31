$(function(){
	//首页
	!$('.index_index').length > 0 || (function(){
		//选择行业效果
		$('.brand_trade').on('click', '.btn_bggray', function() {
			var typeArr = $(this).data('num').split(',');
			if(!$(this).hasClass('cur')){
				$(this).addClass('cur');
				for (var i = 0; i < typeArr.length; i++) {
					$('.brand_classify .bc_left').find('.btn_check_bun').eq(typeArr[i]-1).addClass('cur');
				}
			}else{
				$(this).removeClass('cur');
				for (var i = 0; i < typeArr.length; i++) {
					$('.brand_classify .bc_left').find('.btn_check_bun').eq(typeArr[i]-1).removeClass('cur');
				}
			}
			var selectedLen = $('.brand_classify .bc_left').find('.cur').length;
			if(selectedLen > 1 || selectedLen == 0){
				$('.bc_right').find('.bc_nothing').show().siblings('.scroll_box').hide();
			}else if(selectedLen > 0){//只有一个类别被选中
				//todo
				$('.bc_right').find('.bc_nothing').hide().parent().find('.scroll_box').show().find(':checkbox').prop('checked', true);
			}
		});
		//选择类别效果
		$('.brand_classify .bc_left').on('click', '.btn_check_bun', function() {
			$(this).toggleClass('cur');
			var selectObj = $(this).parent().find('.cur');
			var selectLen = selectObj.length;
			var flag = 0;
			if(selectLen > 1){
				$(this).parent().next().find('.bc_nothing').show().siblings('.scroll_box').hide();
			}else if(selectLen > 0){//只有一个类别被选中
				//todo
				var index = $(this).parent().find('.cur').index();
				$(this).parent().next().find('.bc_nothing').hide().parent().find('.scroll_box').show().find(':checkbox').prop('checked', true);
			}else{
				$(this).parent().next().find('.bc_nothing').show().siblings('.scroll_box').hide();
			}
			if($('.brand_trade .cur').length){
				var typeArr = $('.brand_trade .cur').data('num').split(',');
				selectObj.each(function(index, el) {
					var txt = $(this).text();
					for (var i = 0; i < typeArr.length; i++) {
						if(typeArr[i] == txt){
							flag = 1;
						}
					}
				});
				if(!flag){
					$('.brand_trade .cur').removeClass('cur');
				}
			}
		});
		//取消/全选
		$('.scroll_box li:first').on('click', ':checkbox', function() {
			if($(this).prop('checked')){
				$(this).parents('li').siblings().find(':checkbox').prop('checked', true);
			}else{
				$(this).parents('li').siblings().find(':checkbox').prop('checked', false);
			}
		});
		//单个选择/取消
		$('.scroll_box li:not(:first)').on('click', ':checkbox', function() {
			var p = $(this).parents('ul'),
				li = p.find('li'),
				firstCk = li.first().find(':checkbox'),
				totalLen = p.find(':checkbox').length,
				checkedLen = li.not(':first').find(':checkbox:checked').length;
			if(totalLen == (checkedLen + 1)){
				firstCk.prop('checked', true);
			}else{
				firstCk.prop('checked', false);
			}
		});
		//开始查询
		$('.btn_big').on('click', function() {
			var name = $('.form_box .fb_text');
			var businessLen = $('.brand_trade .cur').length,
				cateLen = $('.brand_classify .bc_left').find('.cur').length;
			if(name.val() == '' || name.val() == name.attr('placeholder')){
				$('.layer_point').show();
				setTimeout(function(){
					$('.layer_point').hide();
				}, 2000);
			}else if(businessLen == 0 && cateLen == 0){
				location.href='brand_list.html';
			}else{
				location.href='brand_list_02.html';
			}
		});
	})();
	//结果列表页
	//行业选择
	/*$('.brand_trade .brand_trand_box').on('click', '.btn_bggray', function() {
		var typeArr = $(this).data('num').split(',');
		$('.brand_classify .brand_classify_box').find('.btn_check_cube').removeClass('cur').find(':checkbox').prop('checked', false);
		if(!$(this).hasClass('cur')){
			$(this).addClass('cur').siblings('a').removeClass('cur');
			for (var i = 0; i < typeArr.length; i++) {
				$('.brand_classify .brand_classify_box').find('.btn_check_cube').eq(typeArr[i]-1).addClass('cur').find(':checkbox').prop('checked', true);
			}
			$('.btn_small').removeClass('not');
		}else{
			$(this).removeClass('cur');
			$('.btn_small').addClass('not');
		}
	});
	//类别选择
	$('.brand_classify').on('click', ':checkbox', function() {
		if($(this).prop('checked')){
			$(this).parent().addClass('cur');
		}else{
			$(this).parent().removeClass('cur');
		}
		if($(this).parents('td').find('.cur').length > 0){
			$('.btn_small').removeClass('not');
		}else{
			$('.btn_small').addClass('not');
			$('.brand_trade .brand_trand_box').find('.cur').removeClass('cur');
		}
	});
	//确定提交
	$('.btn_small').on('click', function() {
		if(!$(this).hasClass('not')){
			location.href='brand_list_02.html';
		}
	});*/
	//搜索结果列表
	!$('.search_type').length > 0 || (function(){
		$('.bc_list').each(function(index, el) {
			//初始设置
			if($(this).find('.btn_check_cube').length > 6){
				$(this).height(20).next('a').removeClass('contract').find('.text').text('更多');
			}else{
				$(this).next('a').hide();
			}
			//更多/收起
			$(this).next().on('click', function() {
				if(!$(this).hasClass('contract')){
					$(this).addClass('contract').find('.text').text('收起');
					$(this).prev().height('auto');
				}else{
					$(this).removeClass('contract').find('.text').text('更多');
					$(this).prev().height('20');
				}
			});
		});
		//列表浮层显示
		$('.search_list .btn_brand_show').hover(function() {
			var left = $(this).offset().left,
				top = $(this).offset().top,
				w = $(this).outerWidth(),
				lw = $('.module_brand_info').outerWidth(),
				ly = $('.module_brand_info').outerHeight();
			var index = $(this).index();
				var lLeft = left;
			if((index + 1) % 5 == 4 || (index + 1) % 5 == 0){
				lLeft = left + w - lw;
			}
			$('.module_brand_info').css({
				'left': lLeft,
				'top': top - ly
			}).show();
		}, function(){
			$('.module_brand_info').hide();
		});
	})();


	//20170118 搜索下拉框选择
	$('.form_box .inp_sel').change(function() {
		var index = $(this).find(':selected').index();
		var txt = $(this).parents('tr').find('.fb_text');
		switch(index){
			case 0:
			    txt.attr('placeholder', '请输入商标名称');
			    break;
			case 1:
			    txt.attr('placeholder', '请输入注册号');
			    break;
			case 2:
			    txt.attr('placeholder', '请输入持有人名称');
			    break;
			default:
			    break;

		}
	});
});
