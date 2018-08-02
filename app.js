const path = require('path');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session')
// const cors = require('koa2-cors');
const redisStore = require('koa-redis')
const koa = require('koa');
const app = new koa();

const config = require('./config');
const index = require('./routes/index');

app.keys = ['cancan'];


const CONFIG = {
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
    encode: json => JSON.stringify(json),
    decode: str => JSON.parse(str),
    store: redisStore({
    	host: config.redis.host,
    	db: config.redis.db,
    	port: config.redis.port
    })
};

app.use(session(CONFIG, app));

app.use(bodyParser());

//配置跨域
// app.use(cors({
//   	origin: function(ctx) {
//     	if (ctx.url === '/test') {
// 	      return false;
// 	    }
// 	    return '*';
//   	},
//   	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   	maxAge: 5,
//   	credentials: true,
//   	allowMethods: ['GET', 'POST', 'DELETE'],
//   	allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }));

app.use(index);
app.use(static(path.join(__dirname), 'static'))

app.listen(3000, () => {
	console.log(`serve is running at localhost:3000`);
})