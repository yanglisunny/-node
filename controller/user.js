//控制层，负责业务逻辑
var UserModel = require("../model/user.js");
const crypto = require('crypto');

const register = (req, res) => {
	const {username, password} = req.body;
	console.log(username, password);
	UserModel.findUser({username: username}, (userinfo) => {
		// console.log(userinfo)
		if(userinfo){
			res.json({
				"ret": true,
				"data": {
					register: false
				}
			})
		}else{
			// 对密码进行加密
			const hash = crypto.createHash('sha256');
			hash.update(password);
			UserModel.addUser(username, hash.digest('hex'), () => {
				res.json({
					"ret": true,
					"data": {
						register: true
					}
				})
			})
		}
	})
}

const login = (req, res) => {
	const {username, password} = req.body;

	const hash = crypto.createHash('sha256');
	hash.update(password);

	UserModel.findUser({
		username: username,
		password: hash.digest('hex')
	}, (userinfo) => {
		if(userinfo){
			req.session.username = username;
			res.json({
				"ret": true,
				"data": {
					username: username,
					login: true
				}
			})
		}else{
			res.json({
				"ret": true,
				"data": {
					login: false
				}
			})
		}
	})
}

const isLogin = (req, res) => {
	if (req.session.username) {
		res.json({
			ret: true,
			data: {
				username: req.session.username,
				isLogin: true
			}
		})
	}else {
		res.json({
			ret: true,
			data: {
				isLogin: false
			}
		})
	}
}

const logout = (req, res) => {
	req.session = null;
	res.json({
		ret: true,
		data: {
			logout: true
		}
	})
}


module.exports = {
	register,
	login,
	isLogin,
	logout
}