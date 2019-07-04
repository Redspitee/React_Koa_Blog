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
    type: String,
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
const _filter = {'__v': 0};
// const  _filter = 'pwd __v'
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