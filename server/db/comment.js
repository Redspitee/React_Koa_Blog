// db/index.js
const mongoose = require('./db')
const Schema = mongoose.Schema;
const childSchema = new Schema({
	content: {
		type: String,
		required: true
	},
	createtime:{
		type: Date,
		required: true,
	},
	ip:{
		type: String,
		required: true,
	},
	isDel: {
		type: Boolean,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	userinfo:{
		type: Object,
		required: true
	}
})
const nowSchema = new Schema({
	content: {
		type: String,
		required: true
	},
	userinfo: {
		type: Object,
		required: true
	},
	ip: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	createtime: {
		type: Date,
		required: true
	},
	children:[childSchema],
	isDel: {
		type: Boolean,
		required: true,
		default: false
	}
});

const MyModel = mongoose.model('comment', nowSchema);
const _filter = {
	'pwd': 0,
	'__v': 0,
	'isDel': 0,
	'children.isDel': 0
};
const initKeys = {
	page: 0, 
	size: 15, 
	sorter: 'createtime_descend' 
}
// const  _filter = 'pwd __v'
class Mongodb {
	constructor() {}
	// 查询
	countAll(obj) {
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
	// 查询
	count(obj) {
		return new Promise((resolve, reject) => {
			MyModel.find({...obj, isDel: false}, _filter)
			.exec((err, res) => {
				if (err) {
					reject(err)
				};
				res && res.length ? resolve(res.length) : resolve(0);
			})
		})
	}
	// 全部评论
	queryAll(obj, keys) {
		let { page = 0, size = 15, sorter = 'createtime_descend' } = keys ? keys : initKeys;
		size = parseInt(size);
		const sortKey = sorter.split('_')[0];
		const sortVal = sorter.split('_')[1] === 'ascend' ? 1 : -1;

		return new Promise((resolve, reject) => {
			MyModel.aggregate([
				{"$match": obj},
				{"$project":  {
						"content": 1,
						"createtime": 1,
						"ip": 1,
						"userinfo": 1,
						"city": 1
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
		
	query(obj, { page, size }) {
		if (!page) page = 0;
		if (!size) size = 15;
		size = parseInt(size);
		return new Promise((resolve, reject) => {
			// 一般情况下返回未删除评论（isDel:false）
			MyModel.aggregate([
				{"$match":{ ...obj, isDel: false }},
				{"$project": {
						"content": 1,
						"createtime": 1,
						"ip": 1,
						"city": 1,
						"userinfo": 1,
						"children": {
							$filter: {
								input: "$children",
								as: "children",
								cond: { 
									$eq:[ "$$children.isDel", false ] ,
								}
							}
						}
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
	// 删除
	delete(fId,_id) {
		return new Promise((resolve, reject) => {
			let data ;
			fId == _id ? data = MyModel.findByIdAndUpdate(fId,{
				isDel: true
			})
			:
			 data = MyModel.findOneAndUpdate({
				  _id: fId,
					children:{
						$elemMatch: { _id: _id }
					}
			 },{
				 $set:{
					"children.$.isDel": true
				 }
			 })
			;
			data.exec( (err, res) => {
				if (err) {
					reject(err)
				}
				resolve(res)
			})
		})
	}
	// 补充信息
	update(_id, data) {
		console.log(data)
		return new Promise((resolve, reject) => {
			MyModel.findByIdAndUpdate(_id, {
				'$push': {
					'children': {...data}
				}
			}, {
				upsert: true,
				new: true,
				fields: _filter
			}, async (err, res) => {
				if (err) {
					reject(err)
				}
				resolve(res)
			})
		})
	}
}
module.exports = new Mongodb()