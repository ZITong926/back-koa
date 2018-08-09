/**
 * 数据库初始化脚本
 */
const { mysql: config } = require('../config/index');

module.exports = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.pass,
        database: config.db,
        charset: config.char,
        multipleStatements: true
    },
    useNullAsDefault: true
})