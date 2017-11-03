import jsonp from '../common/js/jsonp'
import {commonParams, jsonpConfig} from './config'

export function getHomeData() {
  return jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg', Object.assign({}, commonParams, {
    tpl: 'v12',
    page: 'other',
    rnd: Math.random()
  }), jsonpConfig);
}

export function getHotKey() {
  return jsonp('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', commonParams, jsonpConfig);
}
