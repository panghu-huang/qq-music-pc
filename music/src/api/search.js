import jsonp from '../common/js/jsonp'
import {commonParams, jsonpConfig} from './config'

export function search(key) {
  if (!key)
    return;
  return jsonp('https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
    Object.assign({}, commonParams, {
      is_xml: 0,
      key: encodeURIComponent(key)
    }), jsonpConfig)
}

export function searchDetail(keyword) {
  return jsonp('https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
    Object.assign({}, commonParams, {
      ct: 24,
      qqmusic_ver: 1298,
      new_json: 1,
      remoteplace: 'txt.yqq.center',
      searchid: 45352187551093325,
      t: 0,
      aggr: 1,
      cr: 1,
      catZhida: 1,
      lossless: 0,
      flag_qc: 0,
      p: 1,
      n: 20,
      w: encodeURIComponent(keyword)
    }), jsonpConfig);
}
