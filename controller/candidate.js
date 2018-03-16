//控制层，负责业务逻辑
var CandidateModel = require("../model/candidate.js");
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
	const {position, username, worktime, salary, major} = req.body;
	const picture = req.file ? req.file.filename : "";
	CandidateModel.addCandidate(position, username, worktime, salary, major, picture, () => {
		res.json({
			ret: true,
			data: {
				addonation: true
			}
		})
	})
}

const show = (req, res) => {
	const {pagination, pageNum} = req.query;
	CandidateModel.showCandidate(pagination, pageNum, (result) => {
		res.json({
			ret: true,
			data: {
				show: result
			}
		})
	})
}

const getItem = (req, res) => {
	const {id} = req.query;
	CandidateModel.getCandidateItem(id, (result) => {
		res.json({
			ret: true,
			data: {
				candidateInfo: result
			}
		})
	})
}

const update = (req, res) => {
	const {id, position, username, worktime, salary, major} = req.body;
	const picture = req.file ? req.file.filename : "";
	console.log(position, username, worktime, salary, major, picture);
	CandidateModel.updateCandidateItem(id, position, username, worktime, salary, major, picture, (result) => {
		res.json({
			ret: true,
			data: {
				candidateInfo: result
			}
		})
	})

}
module.exports = {
	add,
	show,
	getItem,
	update
}