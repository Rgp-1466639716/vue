$(document).ready(function(){
	$('.reg_tab span').click(function(){
		if(!$(this).hasClass('reg_method')){
			$('.reg_tab span').removeClass('reg_method')
			$(this).addClass('reg_method');
		}
		if($('.phone_reg_tab').hasClass('reg_method')){
			$('.email_reg').css('display','none');
			$('.phone_reg').css('display','block');
		}else{
			$('.phone_reg').css('display','none');
			$('.email_reg').css('display','block');
		}
	})

	


	$('.phone_form').submit(function(){
		var $phone = $('.phone input').val();
		var $upwd = $('.upwd input').val();
		var $repwd = $('.repwd input').val();
		var $user_name = $('.user_name input').val();
		var $userID_num = $('.userID_num input').val();
		// alert("表单信息不完整");
		if(!$phone || !$upwd || !$repwd || !$user_name || !$userID_num){
			alert("表单信息不完整");
			return false;
		}
	})
	$('.email_form').submit(function(){
		console.log(this)
		var $phone = $(this).find(".phone input").val();
		var $email = $(this).find("[name=email]").val();
		var $upwd = $(this).find("[name=upwd]").val();
		var $repwd = $(this).find("[name=repwd]").val();
		var $user_name = $(this).find("[name=user_name]").val();
		var $userID_num = $(this).find("[name=userID_num]").val();
		// console.log($phone,$email,$upwd,$repwd,$user_name,$userID_num)
		if(!$phone || !$upwd || !$repwd || !$user_name || !$userID_num || !$email){
			alert("表单信息不完整");
			return false;
		}
	})
	
	$('.phone input').blur(function(){
		var $phone = $(this).val();
		var rule = /^1[34578]\d{9}$/;
		if(!$phone){
			$(this).siblings(".error_info").text('不能为空');
			$(this).parent().addClass('border_red');
			return;
		}else if(!rule.test($phone)){
			$(this).siblings(".error_info").text('手机号格式不正确');
			$(this).parent().addClass('border_red');
			return;
		}
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange= function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				var result = xhr.responseText;
				if(result == 0){
					$(this).siblings(".error_info").text('对不起,用户名已存在');
 					$(this).parent().addClass('border_red');
 					return;
				}else{
					$(this).siblings(".error_info").text("此账号可用");
					$(this).parent().removeClass('border_red')
				}
			}
		}

		xhr.open('get',"/user/check_phone?phone="+$phone,true);
		xhr.send();

	});
	$('.upwd input').blur(function(){
		var $upwd = $(this).val();
		if(!$upwd){
			$(this).siblings(".error_info").text('不能为空');
			$(this).parent().addClass('border_red')
		}else if($upwd.length<8 || $upwd.length>16){
			$('.upwd .error_info').text('密码长度必须在8-16个字符之间');
			$('.upwd').addClass('border_red')
		}else{
			$(this).siblings(".error_info").text("");
			$(this).parent().removeClass('border_red')
		}
	});
	$('.repwd input').blur(function(){
		var $upwd = $(this).parent().prev().find("[name=upwd]").val();
		var $repwd = $(this).val();
		if(!$repwd){
			$(this).siblings(".error_info").text('不能为空');
			$(this).parent().addClass('border_red')
		}else if($upwd !== $repwd){
			$(this).siblings(".error_info").text('两次输入密码不相同');
			$(this).parent().addClass('border_red')
		} else{
			$(this).siblings(".error_info").text("");
			$(this).parent().removeClass('border_red')
		}
	});
	$('.user_name input').blur(function(){
		var $user_name = $(this).val();
		var rule = /^[\u4E00-\u9FA5]{2,15}$/;
		if(!$user_name){
			$(this).siblings(".error_info").text('不能为空');
			$(this).parent().addClass('border_red')
		}else if(!rule.test($user_name)){
			$(this).siblings(".error_info").text('真实姓名格式不对');
			$('.user_name').addClass('border_red')
		}else{
			$(this).siblings(".error_info").text("");
			$(this).parent().removeClass('border_red')
		}
	});
	$('.userID_num input').blur(function(){
		var $userID_num = $(this).val();
		var rule = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
		if(!$userID_num){
			$(this).siblings(".error_info").text('不能为空');
			$(this).parent().addClass('border_red')
		}else if(!rule.test($userID_num)){
			$(this).siblings(".error_info").text('身份证号格式不正确');
			$('.userID_num').addClass('border_red')
		}
		else{
			$(this).siblings(".error_info").text("");
			$(this).parent().removeClass('border_red')
		}
	});
	$('.email input').blur(function(){
		var $email = $(this).val();
		var rule = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		if(!$email){
			$(this).siblings(".error_info").text('不能为空');
			$(this).parent().addClass('border_red')
		}else if(!rule.test($email)){
			$(this).siblings(".error_info").text('邮箱格式不正确');
			$(this).parent().addClass('border_red')
		}else{
			$(this).siblings(".error_info").text("");
			$(this).parent().removeClass('border_red')
		}
	});
	
	
});