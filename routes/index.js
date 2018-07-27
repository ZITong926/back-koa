const { getUsers, findById } = require('../utils/mysql.js');
const sendSms = require('../utils/msm');
const Router = require('koa-router');
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
	const { user_id } = ctx.session;
	await findById(user_id).then(data => {
		ctx.body = ({
			code: 0,
			data
		})
	}).catch(err => {
		throw err
	})
})

module.exports = router.routes();