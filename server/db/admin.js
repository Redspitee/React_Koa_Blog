// db/index.js
const mongoose = require('./db');
const moment = require('moment');

const Schema = mongoose.Schema;

const nowSchema = new Schema({
	mail: {
		type: String,
		required: true
	},
	mobile:{
		type: String,
		required: true
	},
	password: {
		type: String,
		required: false
	},
	createtime:{
		type: String,
		required: true,
		default: moment().format()
	},
});

const MyModel = mongoose.model('admin', nowSchema);
const _filter = {'password': 0, '__v': 0};

class Mongodb {
	constructor() {}
	// 查询
	query(obj) {
		return new Promise((resolve, reject) => {
			MyModel.find(obj, _filter, (err, res) => {
				if (err) {
					reject(err)
				}
				res.length == 0 ? resolve(false) : resolve(res)
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
			MyModel.findByIdAndUpdate(_id,data, {new:true,fields:_filter}, async (err,res)=>{
				if (err) {
					reject(err)
				}
				resolve(res)
			})
		})
	}
}
module.exports = new Mongodb()