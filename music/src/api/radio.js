import jsonp from '../common/js/jsonp'
import {commonParams, jsonpConfig} from './config'

export function getRadio() {
  return jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiolist.fcg',
    Object.assign({}, commonParams, {
      channel: 'radio',
      page: 'index',
      tpl: 'wk',
      new: 1,
      p: Math.random()
    }), jsonpConfig)
}
