const express = require('express');
const pool = require('../pool.js');                                                                                  
let router = express.Router();
//登录路由
router.post('/login',function(req,res){
	var obj = req.body;
	var sql = "select user_name,uid from perfect_user where (phone=? || email=?)  && upwd=?";

	pool.query(sql,[obj.username,obj.username,obj.upwd],function(err,result){
		if(err) throw err;
		console.log(result);
		if(result.length > 0){
			// res.redirect('/');
			res.send({message:"success",user_name:result[0].user_name,isLoad:true,uid:result[0].uid});
		}else{
			console.log("密码或手机号错误")
			res.send('密码或手机号错误');
		}
	})
});
//检查用户名是否被占用
router.get('/check_phone',function(req,res){
	var obj = req.query;
	var sql = "select * from perfect_user where phone=?";
	pool.query(sql,[obj.phone],function(err,result){
		if(err) throw err;
		console.log(result)
		if(result.length > 0){
			res.send("0")
			return;
		}else{
			res.send("1");
			return;
		}
	})
})
// 注册路由
router.post("/reg",function(req,res){
	var obj = req.body;
	var sql ="insert into perfect_user set ?";
	var user_info = {
		uid : null,
		phone : obj.phone,
		email : obj.email,
		upwd : obj.upwd,
		user_name : obj.user_name,
		userID_num : obj.userID_num
	}
	console.log(user_info)
	pool.query(sql,[user_info],function(err,result){
		if(err) throw err;
		if(result.affectedRows > 0){
			// res.sendFile(__dirname,'/index.html')
			res.redirect('/index.html');
		}else{
			res.send('注册失败')
		}
		
	})
} )
module.exports = router;
