var db = require("../utils/database.js");

var Candidates = db.model("candidate",{
	position: String,
	username: String,
	worktime: String,
	salary: String,
	major: String,
	picture: String
})

const addCandidate = (position, username, worktime, salary, major, picture, callback) => {
	const candidate = new  Candidates({ 
		position: position,
		username: username,
		worktime: worktime,
		salary: salary,
		major: major,
		picture: picture
	});
	candidate.save().then(() => {
		callback();
	})
}

const showCandidate = (pagination, pageNum ,callback) => {
	Candidates.find({}).limit(pageNum).skip(pageNum*(pagination-1)).then((res) => {
		callback(res)
	})
}

const getCandidateItem = (id, callback) => {
	Candidates.findById(id, (err, res) => {
		callback(res)
	})
}

const updateCandidateItem = (id, position, username, worktime, salary, major, picture, callback) => {
	Candidates.findByIdAndUpdate(id, {
		position: position,
		username: username,
		worktime: worktime,
		salary: salary,
		major: major,
		picture: picture
	}, (err, res) => {
		if(!err && res) {
			callback(true);
		}else {
			callback(false);
		}
	})
}
module.exports = {
	addCandidate,
	showCandidate,
	getCandidateItem,
	updateCandidateItem
}