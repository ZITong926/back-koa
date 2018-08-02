const { getUsers, findById } = require('../utils/mysql.js');
const sendSms = require('../utils/msm');
const Router = require('koa-router');
const redis = require('redis').createClient();
const router = new Router();

//登录接口
router.post('/login', async ctx => {
	const { phoneNumber, username, password } = ctx.request.body;
	let num = '';
	if (phoneNumber){
		num = phoneNumber;
	}else {
		num = username;
	}
	await getUsers(num).then( data => {
		if (data[0]) {
			ctx.session.user_id = data[0].id;
			if (password&&password === data.password) {
				ctx.body = ({
					code: 0,
					data
				});
			}else {
				ctx.body = ({
					code: 0,
					data
				});
			}
		} else {
			ctx.body = ({
				code: -1
			});
		}
	}).catch(err => {
		throw err
	})
})

//阿里验证码接口
router.post('/get-phone-code', async ctx => {
  	const { phoneNumber } = ctx.request.body;
	  // 10 进制 取第3位以后的 6位长度 字母转为大写  // .toUpperCase(); 
  	const auth_code = Math.random().toString(10).slice(3).substr(1, 6)
	  // TODO 发送短信 √
  	await sendSms(phoneNumber, auth_code);
  	ctx.body = ({
	    code: 0,
	    auth_code,
  	})
})

router.get('/', async ctx => {
	const sessionid = getSessionId(ctx.header.cookie)
	console.log(sessionid)
	await redis.hgetall(sessionid, function(err, object) {
	  console.log(object)
	})
	// 1533205833776-ejN0iiyZopRcninMXCQJV1KQy9BFm2F-
	const { user_id } = ctx.session
	await findById(user_id).then(data => {
		ctx.body = ({
			code: 0,
			data
		})
	}).catch(err => {
		throw err
	})
})

function getSessionId(cookies){  
    let  c_name = 'koa:sess';  
    if (cookies.length > 0) {  
        c_start = cookies.indexOf(c_name + "=") 
        if (c_start != -1) {   
	        c_start = c_name.length+1   
	        c_end = cookies.indexOf(";",c_start)  
	        if(c_end==-1) c_end = cookies.length  
	        return unescape(cookies.substring(c_start,c_end));  
    	}
    }  
}  

module.exports = router.routes();