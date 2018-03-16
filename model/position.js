//模型层，与数据库交互
var db = require("../utils/database.js");

var Positions = db.model("position",{
	name: String,
	company: String,
	salary: String,
	address: String,
	logo: String
})

const addPosition = (name, company, salary, address, logo, callback) => {
	const position = new Positions({ 
		name: name,
		company: company,
		salary: salary,
		address: address,
		logo: logo
	});

	position.save().then(() => {
		callback();
	})
}

const findPosition = (pagination, pageNum, callback) => {
	
	Positions.find({}).limit(pageNum).skip((pagination-1)*pageNum).then((res) => {
		callback(res);
	})
}

const getTotalPage = (callback) => {
	Positions.find({}).count().then((totalPage) => {
		callback(totalPage)
	})
}

const delItemById = (id, callback) => {
	Positions.findByIdAndRemove(id, (err,result) => {
		if(!err && result){
			callback(result);
		}else{
			callback(result);
		}
		
	})
}

const getItemById = (id, callback) => {
	Positions.findById(id, (err, res) => {
		callback(res);
	})
}

const updatePosition = (id, name, company, salary, address,logo, callback) => {
	console.log("hou:"+id, name, company, salary, address,logo);
	Positions.findByIdAndUpdate(id, {
		name: name,
		company: company,
		salary: salary,
		address: address,
		logo:logo
	}, (err, res) => {
		console.log(res)
		if(!err && res) {

			callback(true);
		}else {

			callback(false);
		}
	})
}

module.exports = {
	addPosition,
	findPosition,
	getTotalPage,
	delItemById,
	getItemById,
	updatePosition
}; 