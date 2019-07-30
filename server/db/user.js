// db/index.js
const mongoose = require('./db')
const Schema = mongoose.Schema;

const nowSchema = new Schema({
	user: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: false
	},
	weburl: {
		type: String,
		required: false
	},
	createtime:{
    type: Date,
		required: true
	},
	ip: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	}
});

const MyModel = mongoose.model('user', nowSchema);
const _filter = {'__v': 0, 'email': 0 };
const initKeys = {
	page: 0, 
	size: 15, 
	sorter: 'createtime_descend' 
}
// const  _filter = 'pwd __v'
class Mongodb {
	constructor() {}
	queryId(_id){
		return new Promise((resolve, reject) => {
			MyModel.findById(_id, async (err,res)=>{
				if (err) {
					reject(err)
				}
				res ? resolve(res) : resolve(false);
			})
		})
	}
	// 查询
	query(obj, keys) {
		let { page = 0, size = 15, sorter = 'createtime_descend' } = keys ? keys : initKeys;
		size = parseInt(size);
		const sortKey = sorter.split('_')[0];
		const sortVal = sorter.split('_')[1] === 'ascend' ? 1 : -1;
		return new Promise((resolve, reject) => {
			MyModel.aggregate([
				{"$match": obj },
				{"$project": {
						'__v': 0,
						'email': 0
					}
				}
			])
			.sort({
				[sortKey]: sortVal
			})
			.skip(page * size)
			.limit(size)
			.exec((err, res) => {
				if (err) {
					reject(err)
				}
				res && res.length == 0 ? resolve([]) : resolve(res)
			})
		
		})
	}
	// 新建
	save(obj = {}) {
		const m = new MyModel(obj);
		return new Promise((resolve, reject) => {
			m.save((err, res) => {
				if (err) {
					reject(err)
				}
				resolve(res)
			})
		})
	}
	// 补充信息
	updata(_id,data){
		return new Promise((resolve, reject) => {
			MyModel.findByIdAndUpdate(_id, data, { new:true, fields: _filter }, async (err,res)=>{
				if (err) {
					reject(err)
				}
				resolve(res)
			})
		})
	}
	count(obj) {
		return new Promise((resolve, reject) => {
			MyModel.find({ ...obj }, _filter)
			.exec((err, res) => {
				if (err) {
					reject(err)
				};
				res && res.length ? resolve(res.length) : resolve(0);
			})
		})
	}
}
module.exports = new Mongodb()