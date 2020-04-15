// $(function(){
    $.ajax({
        url : "header.html",
        type : "get",
        success : function(result){
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

   
    

    // 购物车是否有商品
    var has_product = function(){
        $.ajax({
            url : "/product/findcart",
            type : "get",
            data : {uid:sessionStorage.uid},
            success : function(result){
                // console.log(result);
                if(result.data.length === 0){
                    $(".cart_list").css("display","none")
                    $(".cart_null").css("display","block")
                }else{
                    $(".cart_list").css("display","block")
                    $(".cart_null").css("display","none");
                    var product_list = `<tbody>`;
                    for( var i = 0; i < result.data.length;i++){
                        product_list += `<tr lid="${result.data[i].lid}">
                        <td class="state">
                            <span class="checkbox"  onclick="changeState(this)">
                                <input type="checkbox" name="pids"  checked>
                                <label class="curr" lid="${result.data[i].lid}"></label>
                            </span>
                        </td>
                        <td>
                            <dl class="cf">
                                <dt class="f_left">
                                    <a href="/product/466" target="_blank">
                                        <img src="${result.data[i].pic}" alt="" title="${result.data[i].lanme}">
                                    </a>
                                </dt>
                                <dd class="f_left">
                                    <h1 class="cf">
                                        <a href="/product/466" class="name ellipsis2" target="_blank" title="${result.data[i].lname}">${result.data[i].lname}</a>
                                    </h1>
                                    <p class="ellipsis2" title="款式:红轴">款式:红轴</p>
                                        
                                </dd>
                            </dl>  
                        </td>
                        <td>
                            <span class="amount number-input">
                                <span class="reduce disable" @click="reduce"></span>
                                <input  lid="${result.data[i].lid}" type="text" value="${result.data[i].count}" min="1" data-stock="50" data-suit-number="1" maxlength="3" autocomplete="off">
                                <span class="plus" @click="add"></span>
                            </span>                               
                                <p class="stock">库存<font>50</font>件</p>                       
                        </td>
                        <td class="price">¥<font>${(result.data[i].price*result.data[i].count).toFixed(2)}</font></td>
                        <td><a href="javascript:void(0)" class="del" onclick="del(${result.data[i].lid},this)" lid="${result.data[i].lid}"><span></span></a></td>
                    </tr>`

                    }
                    product_list+=`</tbody>`;
                    $('#cartForm table').append(product_list)
                }
            }
        });
    }
    has_product();
    function checked_shop_num(){
         $(".cart_list table tbody .checkbox")
        console.log($(".cart_list table tbody .checkbox"))
    }
    checked_shop_num();
function del(lid,_this){
    if(sessionStorage.isLoad){
        $.ajax({
            type:"post",
            url:"/product/del",
            data:{uid:sessionStorage.uid ,lid:lid},
            success:result=>{
                $(_this).parent().parent().remove();
                if($("table tbody").children().length === 0){
                    $(".cart_list").css("display","none")
                    $(".cart_null").css("display","block")
                }
            }
        })
    }else{
        $("#Login").css("display","block");
    }
}
function delm(){
    // if($("table tbody").children().length === 0){
    //     alert("请选择要删除的商品");
    // }
    var str = "";
    var checked_num = 0;
    var shops = $(".cart_list table tbody").children();
    for(var i = 0;i < shops.length; i++){
        if($(shops[i]).find(".checkbox input").is(":checked")){
            checked_num++;
            str += $(shops[i]).attr("lid")+ ",";
        }
    }
    if(checked_num === 0){
        alert("请选择要删除的商品");
        return;
    }
    // 截取字符串(吧最后的逗号去掉)
    str=str.substring(0,str.length-1);

    $.ajax({
        type:"post",
        url:"/product/delm",
        data:{uid:sessionStorage.uid ,lid:str},
        success:result=>{
            $(".cart_list table tbody .checkbox").find("input[checked]").parent().parent().parent().remove();
            // console.log($(".cart_list table tbody .checkbox").find("input[checked]"))
            $(".all_checkbox .checkbox label").removeClass("curr");
            console.log(result)
            if($("table tbody").children().length === 0){

                $(".cart_list").css("display","none");
                $(".cart_null").css("display","block");
            }
        }
    })
}

function changeState(_this){
    var ischecked = $(_this).find("input").is(":checked")
    if(ischecked){
        // console.log(123)
        $(_this).find("input").removeAttr("checked")
        // $(_this).find("input").prop("checked","false")
        $(_this).find("label").removeClass("curr")
    }else{
        // $(_this).find("input").prop("checked",true)
        $(_this).find("input").attr("checked","checked")
        $(_this).find("label").addClass("curr");
        var check_num = $(".cart_list table tbody").find("input[checked]").length
        var cart_sop_num = $(".cart_list table tbody").children().length;
        if(check_num == cart_sop_num ){
            $(".all_checkbox .checkbox label").addClass("curr");
        }
    }
}
$(function(){
    $(".all_checkbox").on("click",function(){
        // console.log(321)
        var ischecked = $(".all_checkbox .checkbox label").hasClass("curr");
        if(ischecked){
            // console.log(123)
            $(".all_checkbox .checkbox label").removeClass("curr");
            $(".cart_list table tbody tr .checkbox input").removeAttr("checked")
            // $(".cart_list table tbody tr .checkbox input").prop("checked","false")
            $(".cart_list table tbody tr .checkbox label").removeClass("curr");

        }else{
            $(".all_checkbox .checkbox label").addClass("curr");
            $(".cart_list table tbody tr .checkbox label").addClass("curr");
            // $(".cart_list table tbody tr .checkbox input").prop("checked",true);
            $(".cart_list table tbody tr .checkbox input").attr("checked","checked")
        }
        
    })
})
