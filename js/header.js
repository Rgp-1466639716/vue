$(function(){
    $.ajax({
        url : "header.html",
        type : "get",
        success : function(result){
            $("#header").replaceWith(result);
            $(`<link rel="stylesheet" href="header.css">`).appendTo("head");
            // $(`<script type="text/javascript" src="header.js"></script>`).appendTo("head");
            $(".all_wares .text,.top_nav .all_wares ul").hover(function(){
                $('.all_wares .text').addClass('curr');
                $('.top_nav .all_wares ul').css('display','block');
            },function(){
                $('.all_wares .text').removeClass('curr')
                $('.top_nav .all_wares ul').css('display','none')
            });
            
            (function(){
                var username = sessionStorage.getItem('username');
                if(username){
                    $("header .userlogin>.login").html(username);
                }
            })()
            
            
            //点击登录弹出登录框;
            $(".userlogin .login").click(function(){
                $("#Login").css("display","block")
            })
            
            $('.top_nav .all_wares ul li').hover(function(){
                $('.top_nav .all_wares ul li').addClass('on')
                $(this).find("dl").slideDown();
            },function(){
                $(this).find("dl").css("display","none")
            });

            $("#normaldl").click(function(){
                var $username = $("#username").val();
                var $pwd = $("#passwd").val();
                var data = {username:$username,upwd:$pwd}
                // console.log(data)
                $.ajax({
                    type: "POST",
                    url: "/user/login",
                    data:data,
                    success: function(data) {
                        // console.log(data)
                        if(data.message == "success") {
                            // console.log(data)
                            sessionStorage.setItem("isLoad",data.isLoad);
                            sessionStorage.setItem("username",data.user_name);
                            sessionStorage.setItem("uid",data.uid);
                            // console.log(sessionStorage.isLoad)
                            if(data.isLoad){
                                $("header .userlogin>.login").html(data.user_name);
                                alert("登录成功");
                                $("#Login").hide();
                                $("#username").val("");
                                $("#passwd").val("");
                                has_product();
                            }
                        } else {
                            alert("用户名或密码错误");
                        }   
                    }
                });
            })
        
            $(".WM_Login .closebox span").click(function(){
                $("#Login").hide();
            })
        }
    });
    
   
})
