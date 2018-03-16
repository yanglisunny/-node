//控制层，负责业务逻辑
var PositionModel = require("../model/position.js");
const crypto = require('crypto');
const fs = require('fs'); // 引入fs模块  


const add = (req, res) => {
	if(!req.session.username){
		res.json({
			ret: true,
			data: {
				login: false
			}
		})
		return ;
	}

	const {name, company, salary, address} = req.body;
	const logo = req.file ? req.file.filename : "";
	console.log(name, company, salary, address,logo)
	PositionModel.addPosition(name, company, salary, address, logo, () => {
		res.json({
			ret: true,
			data: {
				addonation: true
			}
		})
	})
}

const show = (req, res) => {
	const pagination = req.query.pagination ? parseInt(req.query.pagination, 10) : 1;
	const pageNum = req.query.pageNum ? parseInt(req.query.pageNum, 10) : 10;
	
	PositionModel.getTotalPage((totalPage) => {
		PositionModel.findPosition(pagination, pageNum, (positionInfo) => {
			const num = Math.ceil(totalPage/pageNum);
			res.json({
				ret: true,
				data: {
					pageNum: pageNum,
					pagination: pagination,
					totalPage: num,
					positionInfo: positionInfo
				}
			})
		})
	})
}

const del = (req, res) => {
	if(!req.session.username){
		res.json({
			ret: true,
			data: {
				login: false
			}
		})
		return ;
	}
	const {id} = req.query;
	PositionModel.delItemById(id, (result) => {
		if(result.logo){
			fs.unlink('./public/uploads/'+result.logo);
		}
	
		res.json({
			ret: true,
			data: {
				delFlag: result
			}
		})
	})
}

const getItem = (req, res) => {
	if(!req.session.username){
		res.json({
			ret: true,
			data: {
				login: false
			}
		})
		return ;
	}
	const {id} = req.query;
	PositionModel.getItemById(id, (result) => {
		res.json({
			ret: true,
			data: {
				positionInfo: result
			}
		})
	})
}

const update = (req, res) => {
	const {id, name, company, salary, address} = req.body;
	PositionModel.getItemById(id, (result) => {
		let logo = result.logo
		console.log(result)
		 logo = req.file ? req.file.filename : logo;
		//限制若上传文件为空则不改
		PositionModel.updatePosition(id, name, company, salary, address,logo, (updateFlag) => {
			res.json({
				ret: true,
				data: {
					update: updateFlag
				}
			})
		})
	})
	
}

module.exports = {
	add,
	show,
	del,
	getItem,
	update
}