const CONF = {
    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    port: 3000,
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'db',
        pass: '0000',
        char: 'utf8mb4'
    }
}

module.exports = CONF
