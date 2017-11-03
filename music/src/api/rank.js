import jsonp from '../common/js/jsonp'
import {commonParams, jsonpConfig} from './config'

export function getTopCategory() {
  return jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg',
    {
      page: 'index',
      format: 'html',
      tpl: 'macv4',
      v8debug: 1
    }, Object.assign({}, jsonpConfig, {
      name: 'jsonCallback'
    }))
}

export function getTopList(topId = 4, updateKey = '2017-09-24', page = 1, type = 'top') {
  return jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
    Object.assign({}, commonParams, {
      tpl: 3,
      page: 'detail',
      date: updateKey,
      topid: topId,
      type: type,
      song_begin: (page - 1) * 30,
      song_num: 30
    }), jsonpConfig)
}
