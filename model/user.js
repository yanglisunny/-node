//模型层，与数据库交互
var db = require("../utils/database.js");

var Users = db.model("user",{
	username: String,
	password: String
})

const addUser = (username, password, callback) => {
	const user = new Users({ 
		username: username, 
		password: password
	});

	user.save().then(() => {
		callback();
	})
}

const findUser = (userinfo = {}, callback) => {
	Users.findOne(userinfo).then((res) => {
		callback(res)
	})
}

module.exports = {
	addUser,
	findUser
}; 