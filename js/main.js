$(function(){
    
    $.ajax({
        url : "footer.html",
        type : "get",
        success : function(result){
            $("#footer").replaceWith(result);
            $(`<link rel="stylesheet" href="footer.css">`).appendTo("head");
        }
    });
    var username = sessionStorage.getItem('username');
    if(username){
        $("header .userlogin>.login").html(username);
    }

    $('.cart').hover(function(){
		$('.cart .cartlist').slideDown();
		// $('.cart .cartlist').hover(function(){
		$('.cart .cartlist').css("display","block")
	},function(){
		$('.cart .cartlist').stop(true,false).slideUp()
    });


    // 轮播图像
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        speed:300,
        loop: true,
        pagination: {
        el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    $(window).scroll(function(){
        // 滚动条距离顶部的距离 大于 200px时
        if($(window).scrollTop() >= 200){
            $(".back_top").fadeIn(700); // 开始淡入
        }else{
            $(".back_top").fadeOut(); // 如果小于等于 200 淡出
        }
    });
    // 返回顶部动画
    $(".back_top").click(function(){
        $('html,body').animate({scrollTop:0},1000);//回到顶端
    });

   

    // 加入购物车动画
    $('.area .product-item').hover(function(){
        $(this).find('.add').slideDown();
        
    },function(){
        $(this).find('.add').stop(true,false).slideUp()
    });

    //点击小心心效果
    $('a.like').click(function(){
        // console.log(sessionStorage)
        if(sessionStorage.isLoad){
            $(this).children("span").css("background","url(base.png) no-repeat -145px 0")
        }else{
            $("#Login").css("display","block")
        }
    });

    //点击加入购物车
    $(".product-item .add .btn").click(function(){      
        if(sessionStorage.isLoad){
            var lid = $(this).parent().parent().attr("data-lid");
            var price =$(this).parent().parent().find(".price").html();
            var lname = $(this).parent().parent().find(".pro_desc").html();
            var pic =  $(this).parent().parent().find("img").attr("src")
            price = price.slice(1);
            pic = pic.split("_")[0] + "_72.jpg"
            // console.log(pic)
            // return
            $.ajax({
                url:"/product/addcart",
                type:"post",
                data:{
                    uid:sessionStorage.uid,
                    lid:lid,
                    price:price,
                    lname:lname,
                    pic:pic,
                },
                dataType:"json",
                success:function(result){
                    console.log(result)
                    if(result.code === 1){
                        $(".addcart_success").show();
                    }
                }
            })
        }else{
            $("#Login").css("display","block")
        }
    })
    $(".addcart_success .continue").click(function(){
        $(".addcart_success").fadeOut()
    })

    // 点击购物车
    $(".go_my_cart").click(function(){
        sessionStorage.isLoad ? window.location.href="http://127.0.0.1:8080/cart.html" : window.location.href="http://127.0.0.1:8080/cart.html"
    })
})











