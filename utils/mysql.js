const knex = require('../db/initdb.js');

let getUsers = function(num){
	let reg = /^\d{11}$/;
	let loginUser = '';
	if(!reg.exec(num)) {
		loginUser = knex('users').where('username', num)
	}else {
		loginUser = knex('users').where('phoneNumber', num)
	}
    return loginUser
}

let findById = function(id) {
	let userInfo = knex('users').where('id', id)
	return userInfo
}
module.exports= {
	getUsers,
	findById
}