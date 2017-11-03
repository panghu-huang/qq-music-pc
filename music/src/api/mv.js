import jsonp from '../common/js/jsonp'
import {commonParams, jsonpConfig} from './config'

export function getMvList(year = 0, area = 0, tag = 0, page = 0, taglist = 1) {
  return jsonp('https://c.y.qq.com/v8/fcg-bin/getmv_by_tag', Object.assign({}, commonParams, {
    utf8: 1,
    type: 2,
    year: year,
    area: area,
    tag: tag,
    pageno: page,
    pagecount: 20,
    otype: 'json',
    taglist: taglist,
    _: Math.random()
  }), jsonpConfig)
}
