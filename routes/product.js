const express = require('express');
const pool = require('../pool.js');
let router = express.Router();

router.post('/addcart',(req,res)=>{
    var uid = req.body.uid
    var lid = req.body.lid
    var price = req.body.price;
    var lname = req.body.lname;
    var pic = req.body.pic;
    var sql = "SELECT lid FROM perfect_cart WHERE uid = ? AND lid=?"
    pool.query(sql,[uid,lid],(err,result)=>{
        if(err) throw err;
       console.log(result) 
        if(result.length==0){
            var sql = `INSERT INTO perfect_cart VALUES(null,${lid},${price},1,"${lname}","${pic}",${uid})` ;
        }else{
            var sql = `UPDATE perfect_cart SET count=count+1 WHERE uid = ${uid} AND lid = ${lid}`;
        }
        console.log(sql)
        pool.query(sql,(err,result)=>{
            if(err)throw err;
            res.send({code:1,msg:"添加成功"})
        })  
    });
})

router.get("/findcart",(req,res)=>{
    //1:获取用户登录凭证uid
    var uid = req.query.uid;
    //2:没有uid 请登录
    if(!uid){
      res.send({code:-2,msg:"请登录",data:[]});
      return;
    }
    //3:创建sql语句
    var sql = "SELECT id,lid,lname,pic,price,count FROM perfect_cart WHERE uid = ?";
    //4:发送sql语句
    pool.query(sql,[uid],(err,result)=>{
      if(err)throw err;
      res.send({code:1,msg:"查询成功",data:result})
    })
    //5:将服务器返回结果发送脚手架 
  })

  //:删除一条购物车数据
  router.post("/del",(req,res)=>{
    //(1)参数
    var uid = req.body.uid;
    var lid = req.body.lid;
    //(2)sql
    var sql = "DELETE FROM perfect_cart WHERE uid=? AND lid=?";
    //(3)json
    pool.query(sql,[uid,lid],(err,result)=>{
      if(err)throw err;
      //受影响行数
      if(result.affectedRows>0){
        res.send({code:1,msg:"删除成功"})
      }else{
        res.send({code:-1,msg:"删除失败"})
      }
    })
  })

  //:删除选中商品
//:清空购物车
router.post("/delm",(req,res)=>{
    //参数
    var lid= req.body.lid; 
    //sql
    var sql = `DELETE FROM perfect_cart WHERE lid IN (${lid})`;
    //json
    pool.query(sql,(err,result)=>{
      if(err)throw err;
      if(result.affectedRows>0){
        res.send({code:1,msg:"删除成功"})
      }else{
        res.send({code:-1,msg:"删除失败"})
      }
    })
   });

//模块输出
module.exports = router;