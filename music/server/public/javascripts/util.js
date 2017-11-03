// 成功
const SUCCESS = 0, SUCCESS_MSG = 'success';
// 其他错误
const ERROR = 1, ERROR_MSG = '';
// 参数错误
const PARAMETER_ERR = 2, PARAMETER_ERR_MSG = 'parameter error';
// 服务器错误
const SERVER_ERR = 3, SERVER_ERR_MSG = 'server error';
// 错误消息
const errorMsg = [SUCCESS_MSG, ERROR_MSG, PARAMETER_ERR_MSG, SERVER_ERR_MSG];
/**
 * 错误代码
 * @type {{SUCCESS: number, PARAMETER_ERR: number, SERVER_ERR: number, ERROR: number}}
 */
const errorCode = {
  SUCCESS,
  PARAMETER_ERR,
  SERVER_ERR,
  ERROR
};
/**
 * 封装返回的结果
 * @param code 错误代码
 * @param data 返回的数据
 * @param msg 错误消息
 * @return {{status: *, msg: *, data: (*|null)}}
 */
function getResult(code, data, msg) {
  return {
    status: code,
    msg: msg || errorMsg[code],
    data: data || null
  }
}
/**
 * 数据库查找封装（全部）
 * @param model 数据库模型
 * @param param 查找参数
 * @param func 格式化查找结果函数
 * @return {Promise}
 */
function find(model, param = {}, func) {
  if (!model || (func !== undefined && typeof func !== 'function'))
    return null;
  return new Promise((resolve) => {
    model.find(param, (err, doc) => {
      let result;
      if (err) {
        result = getResult(errorCode.SERVER_ERR);
      } else {
        result = getResult(errorCode.SUCCESS, func ? func(doc) : doc);
      }
      resolve(result);
    });
  })
}
/**
 * 数据库查找封装（一条）
 * @param model 数据库模型
 * @param param 查找参数
 * @param func 格式化查找结果函数
 * @return {Promise}
 */
function findOne(model, param = {}, func) {
  if (!model || (func !== undefined && typeof func !== 'function'))
    return null;
  return new Promise((resolve) => {
    model.findOne(param, (err, doc) => {
      let result;
      if (err) {
        result = getResult(errorCode.SERVER_ERR);
      } else {
        result = getResult(errorCode.SUCCESS, func ? func(doc) : doc);
      }
      resolve(result);
    });
  })
}

function operation(model, func, ...params) {
  if (!model || !func)
    return null;
  return new Promise((resolve, reject) => {
    model[func](...params || {}, (err, doc) => {
      if (err) {
        reject({
          status: errorCode.ERROR,
          msg: err.message
        });
      } else {
        resolve(doc);
      }
    })
  })
}

module.exports = {
  errorCode,
  getResult,
  findOne,
  find,
  operation
};
