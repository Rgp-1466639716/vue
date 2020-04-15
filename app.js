const express = require("express");
const pool = require("./pool.js");
let userRooter = require('./routes/user.js');
let productRooter = require('./routes/product.js');
let bodyParser = require("body-parser");
let app = express();
app.listen(8080);

app.use(bodyParser.urlencoded({
	extended:false
}));

//静态资源托管
app.use(express.static('./public'));
app.use(express.static('./css'));
app.use(express.static('./js'));
app.use(express.static('./image'));

app.use("/user", userRooter);
app.use("/product", productRooter);
