const { db } = require('../schema/config');
const userSchema = require('../schema/user');
const crypto = require('../until/crypto');

const User = db.model('users', userSchema);

exports.res = async ctx => {
    let data = ctx.request.body;
    let username = data.username;
    let password = crypto(data.password);
    await new Promise((resolve, reject) => {
        User.find({ username }, (errors, data) => {
            if (errors) return reject(errors);
            if (data.length !== 0) return resolve();
            const _user = new User({
                username,
                password
            });
            _user.save((errors, data) => {
                if (errors) {
                    reject(errors);
                } else {
                    resolve(data);
                }
            });
        });
    }).then(async data => {
        if (data) { // 注册成功
            ctx.body = {
                resSuccess: true
            };
        } else { // 用户名已存在
            ctx.body = JSON.stringify({
                userExisted: true
            });
        }
    }).catch(errors => {
        if (errors) {
            ctx.body = { // 注册失败
                resFailed: false
            };
        }
    });
};

exports.login = async ctx => {
    let data = ctx.request.body;
    let username = data.username;
    let password = crypto(data.password);
    await new Promise((resolve, reject) => {
        User.find({ username }, (errors, data) => {
            if (errors) return reject(errors);
            if (data.length === 0) return resolve('1');
            if (data[0].password === password) return resolve(data);
            resolve('3');
        });
    }).then(data => {
        if (data === '1') {
            ctx.body = { // 用户名不存在
                userExisted: false
            };
        } else if (data === '3') { // 密码错误
            ctx.body = {
                wrongPassword: true
            };
        } else if (data.length >= 1) { // 登录成功
            ctx.body = {
                loginSuccess: true
            };
            ctx.cookies.set('username', username, {
                domain: 'localhost',
                path: '/',
                maxAge: 36e5,
                httpOnly: true,
                overwrite: false
            });
            ctx.cookies.set('uid', data[0]._id, {
                domain: 'localhost',
                path: '/',
                maxAge: 36e5,
                httpOnly: true,
                overwrite: false
            });
            ctx.session = {
                username,
                uid: data[0]._id
            };
        }
    }).catch(errors => {
        console.log(errors);
    });
};

exports.keepLog = async(ctx, next) => {
    if (ctx.session.isNew) {
        if (ctx.cookies.get('username')) {
            ctx.seesion = {
                username: ctx.seesion.get('username'),
                uid: ctx.session.get('uid')
            };
        }
    }
    await next();
};

exports.init = async ctx => {
     if (!ctx.seesion.isNew) {
        ctx.body.info = true;
    } else {
        ctx.body.info = false;
    };
};

exports.logout = async ctx => {
    ctx.session = null;
    ctx.cookie.set('username', null, {
        maxAge: 0
    });
    ctx.cookie.set('uid', null, {
        maxAge: 0
    });
    ctx.body = {
        info: true
    };
};