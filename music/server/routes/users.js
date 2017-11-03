let express = require('express');
let router = express.Router();
let User = require('../models/user');
let multiparty = require('multiparty');
let util = require('../public/javascripts/util');
// Node文件系统
let fs = require('fs');
// 文件上传目录
const UPLOAD_DIR = './server/public/upload/';

router.get('/', (req, res) => {
  res.render('index', {title: 'Users'})
});
/**
 * 用户登录接口
 */
router.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.json(util.getResult(util.errorCode.PARAMETER_ERR))
  } else {
    util.operation(User, 'findOne', {username})
      .then(doc => {
        res.json({
          status: 0,
          data: doc || null
        })
      })
      .catch(err => {
        res.json(err)
      })
  }
});

/**
 * 检查用户是否存在接口
 */
router.post('/checkUser', (req, res) => {
  let username = req.body.username;
  if (!username) {
    res.json(util.getResult(util.errorCode.PARAMETER_ERR));
    return;
  }
  util.operation(User, 'findOne', {username})
    .then(doc => {
      res.json({
        status: 0,
        data: doc ? doc.username : null
      })
    })
    .catch(err => {
      res.json(err)
    })
});

/**
 * 用户注册接口
 */
router.post('/register', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let phone = req.body.phone;
  let question = req.body.question;
  let answer = req.body.answer;
  if (!username || !password || !phone || !question || !answer) {
    res.json(util.getResult(util.errorCode.PARAMETER_ERR));
  } else {
    util.operation(User, 'findOne', {username})
      .then(doc => {
        if (!doc) {
          let user = {
            userId: new Date().getTime(),
            username,
            password,
            nickname: username,
            avatar: 'avatar.jpg',
            songList: [],
            iLike: [],
            follow: [],
            fans: []
          };
          util.operation(User, 'create', user)
            .then(doc => {
              res.json({
                status: 0,
                msg: '',
                data: doc.username || null
              })
            })
            .catch(err => {
              res.json(err)
            })
        } else {
          res.json({
            status: util.errorCode.ERROR,
            msg: '用户已存在',
            data: null
          })
        }
      })
      .catch(err => {
        res.json(err)
      })
  }
});

/**
 * 用户更新头像
 */
router.post('/updateAvatar', (req, res) => {
  let form = new multiparty.Form();
  form.encoding = 'utf-8';
  form.uploadDir = UPLOAD_DIR;
  form.keepExtensions = true;
  form.maxFilesSize = 5 * 1024 * 1024;
  form.maxFieldsSize = 2 * 1024 * 1024;
  form.parse(req, (err, fields, files) => {
    console.log(files);
    if (err) {
      res.json(util.getResult(util.errorCode.ERROR, null, '上传出错了'))
    } else {
      res.json(util.getResult(util.errorCode.SUCCESS));
      fs.rename(files.file[0]['path'], UPLOAD_DIR + files.file[0]['originalFilename']);
    }
  })
});

/**
 * 用户获取头像
 */
router.get('/getAvatar', (req, res) => {
  let username = req.param('username');
  if (!username) {
    res.json(util.getResult(util.errorCode.PARAMETER_ERR));
    return;
  }
  util.operation(User, 'findOne', {username})
    .then(doc => {
      if (doc) {
        let url = doc.avatar;
        fs.readFile(UPLOAD_DIR + url, 'binary', function (err, file) {
          if (file) {
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.write(file, 'binary');
            res.end();
          }
        })
      } else {
        res.json({
          status: util.errorCode.ERROR,
          msg: '没找到对应的图片'
        })
      }
    })
    .catch(err => {
      res.json(err)
    })
});

module.exports = router;
