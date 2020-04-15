$(function(){
    $.ajax({
        url : "header.html",
        type : "get",
        success : function(result){
            console.log(123)
            $("#header").replaceWith(result);
            $(`<link rel="stylesheet" href="header.css">`).appendTo("head");

            $(`<script type="text/javascript" src="header.js"></script>`).appendTo("head");
        }
    });
    $.ajax({
        url : "footer.html",
        type : "get",
        success : function(result){
            $("#footer").replaceWith(result);
            $(`<link rel="stylesheet" href="footer.css">`).appendTo("head");
        }
    });

    $('.cart').hover(function(){
        $('.cart .cartlist').slideDown();
        // $('.cart .cartlist').hover(function(){
            $('.cart .cartlist').css("display","block")
    },function(){
            $('.cart .cartlist').stop(true,false).slideUp()
    });
    
    $(".picFocus>.small_img").on("click","li",function(){
        $(this).addClass("on").siblings().removeClass("on")
        var index = $(this).index();
        // console.log(index);
        $(".picFocus>.big_img ul").animate({"left":`${-430*index}`})
    })
    
    $(".picFocus>.small_img ul li").hover(
        function(){
            $(this).addClass("hover").siblings().removeClass("hover")
        },
        function(){
            $(".picFocus>.small_img ul li").removeClass("hover")
        }
    ) 
    $('.property .style p span').click(function () {
        if(!$(this).hasClass('checked')){
            $(this).addClass('checked');
            $(this).siblings('.checked').removeClass('checked')
        }
    })
    // 购买数量加
    $('.property .count .amount .plus').click(function () {
        var count = $("#buyNumber").val();
        count++;
        $("#buyNumber").val(count);
        // count = (count*1)+1;
        // console.log(count)
    })
    // 购买数量减
    $('.property .count .amount .reduce').click(function () {
        var count = $("#buyNumber").val();
        if(count != 1){
            $('.property .count .amount .reduce').removeClass("disable")
            count--;
            $("#buyNumber").val(count);
        }else{
            $('.property .count .amount .reduce').addClass("disable");
        }
    })
    
    
    $(".scom .select").click(function(){
        $(this).children(".promptChenge").css({"display":"block"})
    })
    
    $(".details_nav li a").click(function(){
        $(this).parent().siblings().removeClass("curr");
        $(this).parent().addClass("curr");
        if($(".details_nav li:first-child").hasClass("curr")){
            $(".introduce").css({"display":"block"});
            $(".evaluate").css({"display":"none"})
        }else{
            $(".introduce").css({"display":"none"});
            $(".evaluate").css({"display":"block"})
        }
    })
    $(".scom li a").click(function(){
        $(this).parent().siblings().removeClass("on");
        $(this).parent().addClass("on");
        var index = $(this).parent().index();
        $(".scom .content").css({"left":`${-988*index}px`})
        console.log(index);
    })
})

