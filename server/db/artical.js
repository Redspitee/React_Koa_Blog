// db/index.js
const mongoose = require('./db')
const Schema = mongoose.Schema;

const nowSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	desc: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	pics:{
		type: Array,
		default:[]
	},
	createtime:{
    type: String,
		required: true
	},
	isDel: {
		type: Boolean,
		required: true,
		default: false
	}
});

const MyModel = mongoose.model('artical', nowSchema);
const _filter = { '__v': 0,'isDel':0};
// const  _filter = 'pwd __v'
class Mongodb {
	constructor() {}
	query(obj) {
		return new Promise((resolve, reject) => {
			MyModel.find(obj, _filter, (err, res) => {
				res.length == 0 ? resolve(false) : resolve(res)
			})
		})
	}
	// 查询
	queryList(obj, { page, size }) {
		if (!page) page = 0;
		if (!size) size = 15;
		size = parseInt(size);
		return new Promise((resolve, reject) => {
			MyModel.aggregate([
				{"$match": { ...obj, isDel: false }},
				{"$project": {
						'content':0,
						'__v':0
					}
				}
			])
			.sort({
				createtime: -1
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
		// 查询
	count(obj) {
			return new Promise((resolve, reject) => {
				MyModel.find({...obj,isDel: false}, _filter)
				.exec((err, res) => {
					if (err) {
						reject(err)
					};
					!res.length ? resolve(0) : resolve(res.length)
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